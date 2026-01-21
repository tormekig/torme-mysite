import React from 'react'
import { AreaCode, MA } from 'areacode/pages/detail'
import MAList from 'areacode/assets/css/MAList.module.scss'
import { getColorStyleByAreaCode } from 'areacode/components'
import { MACompListContent } from '../MACompListContent'
import { rememberWordData } from './rememberWords'
import RememberWordCsvLoader from './getCSV'
import { AreaCodeFormatter } from './services/AreaCodeFormatter'
import { TextExportService } from './services/TextExportService'
import { allowed4DigitsNumbersForDojinshi } from './constants/areaCodeConstants'
import { FormattedData } from './types/dojinshiTypes'

export function MAAreaCodeInfoDojinshi({
  areacode,
  word,
  transformedAreacode,
  data,
}: {
  areacode: string
  word: string
  transformedAreacode: string
  data: FormattedData
}) {
  const colorStyle = getColorStyleByAreaCode(transformedAreacode)
  return (
    <div className={`${MAList.infoDojinshi}`}>
      <div className={MAList.areacode}>
        {<AreaCode areaCode={transformedAreacode} colorStyle={colorStyle} />}
      </div>

      <div className={MAList.mApref}>
        <div className={MAList.words}>{word}</div>
        <div className={MAList.maCompContainer}>
          {data.maComps.map((maComp, i) => {
            return maComp.head4digits !== areacode ? (
              <div className={MAList.maInfo} key={i}>
                <div className={MAList.maNumberBands}>
                  <MA ma={`${maComp.ma}(${maComp.head4digits}を参照)`} />
                </div>
              </div>
            ) : (
              <div className={MAList.maInfo} key={i}>
                <div className={MAList.maNumberBands}>
                  <MA ma={maComp.ma} />
                  <ul className={MAList.numberBands}>{maComp.numberBands}</ul>
                </div>
                <div className={MAList.citiesContainer}>
                  <>
                    {maComp.formattedCities?.main.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function searchRememberWordData(query: string) {
  return TextExportService.searchRememberWordData(rememberWordData, query)
}

function transformAreaCode(code: string) {
  return AreaCodeFormatter.transform(code)
}

export function MAAreaCodeInfoDojinshis() {
  RememberWordCsvLoader()
  const elems = []
  const exports = TextExportService.createEmptyExports()

  const flattenAllowedNumbers = allowed4DigitsNumbersForDojinshi.flat(2)

  for (let i = 0; i < flattenAllowedNumbers.length; i++) {
    const num = flattenAllowedNumbers[i]
    const areacode = `0${num}`
    const transformedAreacode = transformAreaCode(areacode)
    const MAComps =
      MACompListContent.filterMACompListByPrefixAreaCode(transformedAreacode)

    const rememberWord = searchRememberWordData(transformedAreacode)
    const word = rememberWord[0]?.word ?? ''

    const textData = AreaCodeFormatter.formatToTextData(
      areacode,
      transformedAreacode,
      word,
      MAComps,
    )

    TextExportService.addToExports(
      exports,
      'allMA',
      textData.multiMACombinedCities,
    )

    const key = TextExportService.determineExportKey(MAComps.length)
    TextExportService.addToExports(exports, key, textData.text)

    if (MAComps.length === 0) {
      const colorStyle = getColorStyleByAreaCode(areacode)
      elems.push(
        <div className={MAList.infoBlockContainer} key={num}>
          <div className={`${MAList.infoDojinshi}`}>
            <div className={MAList.areacode}>
              {<AreaCode areaCode={areacode} colorStyle={colorStyle} />}
            </div>
            <div className={MAList.mApref}>{word}</div>
          </div>
        </div>,
      )
    } else {
      elems.push(
        <div className={MAList.infoBlockContainer} key={num}>
          <MAAreaCodeInfoDojinshi
            areacode={areacode}
            word={word}
            transformedAreacode={transformedAreacode}
            data={textData.formatted}
          />
        </div>,
      )
    }
  }

  console.log(exports)
  return <>{elems}</>
}
