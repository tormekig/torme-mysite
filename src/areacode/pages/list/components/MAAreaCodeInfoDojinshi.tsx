import React, { useEffect, useState } from 'react'
import {
  AreaCode,
  formatCitiesForDojinshi,
  formatNumberBands,
  MA,
} from 'areacode/pages/detail'
import MAList from 'areacode/assets/css/MAList.module.scss'
import { MACompInfo } from 'areacode/data/MACompList'
import { getColorStyleByAreaCode } from 'areacode/components'
import { MAInfoDetail } from './MAInfoDetail'
import { MACompListContent } from '../MACompListContent'
import { RememberWord } from './getCSV'
import { rememberWordData } from './rememberWords'
import RememberWordCsvLoader from './getCSV'

type formattedData = {
  transformedAreacode: string
  word: string
  maComps: (
    | {
        ma: string
        refText: string
        numberBands?: undefined
        cities?: undefined
      }
    | {
        ma: string
        numberBands: string
        cities: { main: string[]; sub: string }
        refText?: undefined
      }
  )[]
}

export function MAAreaCodeInfoDojinshi({ data }: { data: formattedData }) {
  const colorStyle = getColorStyleByAreaCode(data.transformedAreacode)
  return (
    <div className={`${MAList.infoDojinshi}`}>
      <div className={MAList.areacode}>
        {
          <AreaCode
            areaCode={data.transformedAreacode}
            colorStyle={colorStyle}
          />
        }
      </div>

      <div className={MAList.mApref}>
        <div className={MAList.words}>{data.word}</div>
        <div className={MAList.maCompContainer}>
          {data.maComps.map((maComp, i) => {
            return maComp.refText ? (
              <div className={MAList.maInfo} key={i}>
                <div className={MAList.maNumberBands}>
                  <MA ma={maComp.refText} />
                </div>
              </div>
            ) : (
              <div className={MAList.maInfo} key={i}>
                <div className={MAList.maNumberBands}>
                  <MA ma={maComp.ma} />
                  <ul className={MAList.numberBands}>{maComp.numberBands}</ul>
                </div>
                <div className={MAList.citiesContainer}>
                  <>{maComp.cities?.main.map((s) => <div>{s}</div>)}</>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function searchRememberWordData(data: RememberWord[], query: string) {
  return data.filter((row) => {
    return row.areacode === query
  })
}

function isAllowed(n: number) {
  const excludeRanges = [
    { start: 111, end: 119, only: [112] },
    { start: 200, end: 219 },
    { start: 300, end: 399, only: [331] },
    { start: 400, end: 419 },
    { start: 440, end: 449, only: [442] },
    { start: 450, end: 459, only: [452] },
    { start: 500, end: 519 },
    { start: 520, end: 529, only: [522] },
    { start: 600, end: 699, only: [641] },
    { start: 700, end: 719 },
    { start: 750, end: 759, only: [752] },
    { start: 780, end: 789, only: [782] },
    { start: 800, end: 819 },
    { start: 900, end: 919 },
    { start: 920, end: 929, only: [920, 922, 923] },
    { start: 930, end: 939, only: [930, 932] },
  ]

  for (const range of excludeRanges) {
    const inRange = n >= range.start && n <= range.end

    if (!inRange) continue
    if (range.only) {
      return range.only.includes(n)
    }

    return false
  }

  return true
}

function transformAreaCode(code: string) {
  if (code === '0112') return '011'
  if (code === '0331') return '03'
  if (code === '0442') return '044'
  if (code === '0452') return '045'
  if (code === '0522') return '052'
  if (code === '0641') return '06'
  if (code === '0752') return '075'
  if (code === '0782') return '078'
  return code
}

export function MAAreaCodeInfoDojinshis() {
  RememberWordCsvLoader()
  const elems = []
  const exports = {
    noMA: '4桁;覚え方\n',
    oneMA: '4桁;覚え方;MA1;MA1地域詳細\n',
    twoMA: '4桁;覚え方;MA1;MA1地域詳細;MA2;MA2地域詳細\n',
    multiMA:
      '4桁;覚え方;MA1;MA1地域詳細;MA2;MA2地域詳細;MA3;MA3地域詳細;MA4;MA4地域詳細;MA5;MA5地域詳細\n',
  }

  for (let i = 111; i < 1000; i++) {
    if (!isAllowed(i)) continue
    const areacode = `0${i}`
    const transformedAreacode = transformAreaCode(`0${i}`)
    const MAComps =
      MACompListContent.filterMACompListByPrefixAreaCode(transformedAreacode)

    const rememberWord = searchRememberWordData(
      rememberWordData,
      transformedAreacode,
    )
    const word = rememberWord[0]?.word ?? ''

    const { formatted, text } = getTextData(
      areacode,
      transformedAreacode,
      word,
      MAComps,
    )
    if (MAComps.length === 0) {
      exports.noMA += text + '\n'
    } else if (MAComps.length === 1) {
      exports.oneMA += text + '\n'
    } else if (MAComps.length === 2) {
      exports.twoMA += text + '\n'
    } else {
      exports.multiMA += text + '\n'
    }

    if (MAComps.length === 0) {
      const colorStyle = getColorStyleByAreaCode(areacode)
      elems.push(
        <div className={MAList.infoBlockContainer} key={i}>
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
        <div className={MAList.infoBlockContainer} key={i}>
          <MAAreaCodeInfoDojinshi data={formatted} />
        </div>,
      )
    }
  }
  console.log(exports)
  return <>{elems}</>
}

function getTextData(
  areacode: string,
  transformedAreacode: string,
  word: string,
  MAComps: MACompInfo[],
) {
  const formatted = getFormatData(areacode, transformedAreacode, word, MAComps)
  const maCompsText = formatted.maComps
    .map((maComp) => {
      return maComp.cities
        ? `${maComp.ma} ${maComp.numberBands}<br>${maComp.cities.main.join('<br>')};${maComp.cities.sub}`
        : `${maComp.refText};`
    })
    .join(';')
  return {
    formatted,
    maCompsText,
    text: `${formatted.transformedAreacode};${formatted.word};${maCompsText}`,
  }
}

function getFormatData(
  areacode: string,
  transformedAreacode: string,
  word: string,
  MAComps: MACompInfo[],
) {
  return {
    transformedAreacode,
    word,
    maComps: MAComps.map((MAComp) => {
      const info = new MAInfoDetail(MAComp)
      if (MAComp.head4digits !== areacode)
        return {
          ma: info.ma,
          refText: `${info.ma}(${MAComp.head4digits}を参照)`,
        }
      return {
        ma: info.ma,
        numberBands: formatNumberBands(info.areaCode, info.numberBands)
          .map((numberBand) => numberBand.txt + numberBand.elim)
          .join(', '),
        cities: formatCitiesForDojinshi(info.cities),
      }
    }),
  }
}
