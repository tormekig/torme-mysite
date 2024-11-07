import React from 'react'
import MAList from '../../../assets/css/MAList.module.scss'

export interface NumberBandInfo {
  id: string
  MA: string
  areaCode: string
  bandStart: string
  bandEnd: string
  eliminateCode: string
}

export function NumberBands({
  areaCode,
  numberBands,
}: {
  areaCode: string
  numberBands: NumberBandInfo[]
  className?: string
}) {
  function insertStr(str: string, id: number, val: string): string {
    const res = str.slice(0, id) + val + str.slice(id)
    return res
  }

  const lis: React.JSX.Element[] = []

  numberBands.forEach(function (numberBand, i) {
    const bandStart = insertStr(numberBand.bandStart, areaCode.length, '-')
    const bandEnd = insertStr(numberBand.bandEnd, areaCode.length, '-')

    let txt: string | React.JSX.Element = `${bandStart}`
    if (bandStart !== bandEnd) {
      txt = `${txt} ～ ${bandEnd}`
    }
    if (numberBand.eliminateCode !== '0') {
      const elim = '（' + numberBand.eliminateCode + 'を除く）'
      txt = (
        <div>
          {txt}
          <br />
          <small>{elim}</small>
        </div>
      )
    }
    lis.push(
      <li key={i}>
        <div>{txt}</div>
      </li>,
    )
  })

  return (
    <div>
      <ul className={MAList.numberBands}>{lis}</ul>
    </div>
  )
}
