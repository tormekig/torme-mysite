import React from 'react'
import MAList from '../../../assets/css/MAList.module.scss'
import quiz from 'areacode/assets/css/quiz.module.scss'

export interface NumberBandInfo {
  id: string
  MA: string
  areaCode: string
  bandStart: string
  bandEnd: string
  eliminateCode: string
}

export function formatNumberBands(
  areacode: string,
  numberBands: NumberBandInfo[],
) {
  function insertStr(str: string, id: number, val: string): string {
    return str.slice(0, id) + val + str.slice(id)
  }

  return numberBands.map((band) => {
    const bandStart = insertStr(band.bandStart, areacode.length, '-')
    const bandEnd = insertStr(band.bandEnd, areacode.length, '-')

    let txt = bandStart

    if (bandStart !== bandEnd) {
      txt += `～${bandEnd}`
    }

    const elim =
      band.eliminateCode !== '0' ? `(${band.eliminateCode}を除く)` : ''

    return { txt, elim }
  })
}

export function NumberBands({
  areacode: areaCode,
  numberBands,
  isQuiz = false,
  isTxt = false,
}: {
  areacode: string
  numberBands: NumberBandInfo[]
  isQuiz?: boolean
  isTxt?: boolean
}) {
  const className = isQuiz ? quiz.numberBands : MAList.numberBands

  const numberBandList = formatNumberBands(areaCode, numberBands)

  return isTxt ? (
    <ul className={className}>
      {numberBandList
        .map((numberBand) => numberBand.txt + numberBand.elim)
        .join(', ')}
    </ul>
  ) : (
    <ul className={className}>
      {numberBandList.map((numberBand, i) => (
        <li key={i}>
          {numberBand.txt}
          <small>{numberBand.elim}</small>
        </li>
      ))}
    </ul>
  )
}
