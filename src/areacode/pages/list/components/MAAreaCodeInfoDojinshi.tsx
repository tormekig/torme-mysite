import React, { useEffect, useState } from 'react'
import {
  AreaCode,
  Cities,
  CitiesForDojinshi,
  MA,
  NumberBands,
  Pref,
} from 'areacode/pages/detail'
import MAList from 'areacode/assets/css/MAList.module.scss'
import MACompList, { MACompInfo } from 'areacode/data/MACompList'
import {
  getColorStyleByAreaCode,
  getColorStyleForQuiz,
} from 'areacode/components'
import { MAInfoDetail } from './MAInfoDetail'
import { MACompListContent } from '../MACompListContent'
import CsvLoader, { RememberWord } from './getCSV'
import RememberWordCsvLoader from './getCSV'

export function MAAreaCodeInfoDojinshi({
  areacode,
  word,
  MAComps,
}: {
  areacode: string
  word: string
  MAComps: MACompInfo[]
}) {
  const colorStyle = getColorStyleByAreaCode(areacode)
  return (
    <div className={`${MAList.infoDojinshi}`}>
      <div className={MAList.areacode}>
        {<AreaCode areaCode={areacode} colorStyle={colorStyle} />}
      </div>

      <div className={MAList.mApref}>
        <div className={MAList.words}>{word}</div>
        {MAComps.map((MAComp) => {
          const info = new MAInfoDetail(MAComp)
          const colorStyle = getColorStyleByAreaCode(info.areaCode)
          return (
            <div className={MAList.maInfo}>
              <div className={MAList.maNumberBands}>
                <div className={MAList.maNumberBandsInner}>
                  {<MA ma={info.ma} />}
                  {
                    <NumberBands
                      areaCode={info.areaCode}
                      numberBands={info.numberBands}
                    />
                  }
                </div>
              </div>
              <div className={MAList.citiesContainerOuter}>
                {
                  <div className={MAList.citiesContainer}>
                    <CitiesForDojinshi cities={info.cities} />
                  </div>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function searchRememberWordData(data: RememberWord[], query: string) {
  return data.filter((row) => {
    return row.areacode === query
  })
}

export function MAAreaCodeInfoDojinshis() {
  const rememberWordData: RememberWord[] | null = CsvLoader()

  if (!rememberWordData) return <div>Loading...</div>

  const elems = []

  for (let i = 111; i < 1000; i++) {
    const query = `0${i}`
    const MAComps = MACompListContent.filterMACompListByPrefixAreaCode(query)

    const rememberWord = searchRememberWordData(rememberWordData, query)
    if (rememberWord.length > 1) console.log(query, rememberWord)
    const word = rememberWord[0]?.word ?? ''

    if (MAComps.length === 0) {
      const colorStyle = getColorStyleByAreaCode(query)
      elems.push(
        <div className={MAList.infoBlockContainer} key={i}>
          <div className={`${MAList.infoDojinshi}`}>
            <div className={MAList.areacode}>
              {<AreaCode areaCode={query} colorStyle={colorStyle} />}
            </div>
            <div className={MAList.mApref}>{word}</div>
          </div>
        </div>,
      )
    } else {
      elems.push(
        <div className={MAList.infoBlockContainer} key={i}>
          <MAAreaCodeInfoDojinshi
            areacode={`${query}`}
            word={word}
            MAComps={MAComps}
          />
        </div>,
      )
    }
  }
  return <>{elems}</>
}
