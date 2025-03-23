import React from 'react'
import { Link } from 'react-router-dom'
import { getColorStyleByAreaCode } from './color'
import areacode from 'areacode/assets/css/areacode.module.scss'
import codeColors from 'areacode/data/codeColor'

export function Code2digit() {
  const codes = []

  for (let i = 1; i <= 9; i++) {
    const middleAreaCode = '0' + String(i * 10 + 5)
    const colorStyle = getColorStyleByAreaCode(middleAreaCode)

    codes.push(
      <li key={i}>
        <Link
          to={`/areacode/code/prefix/0${i}`}
          // className={areacode[`code-list-${first}`]}
          style={colorStyle.background}
        >
          0{i}
        </Link>
      </li>,
    )
  }

  return (
    <div className={areacode.codeListContainer}>
      <ul className={areacode.codeList}>{codes}</ul>
    </div>
  )
}

export function Code3digit(areacodeSecondDigit: number) {
  const codes: React.JSX.Element[] = []

  if (!codeColors[areacodeSecondDigit - 1]) return <></>

  codeColors[areacodeSecondDigit - 1].forEach(function (elem, i) {
    const areacodeSecondAndThirdDigits =
      '0' + String(areacodeSecondDigit * 10 + i)
    const colorStyle = getColorStyleByAreaCode(areacodeSecondAndThirdDigits)

    codes.push(
      <li key={i}>
        <Link
          to={`/areacode/code/prefix/${elem.code}`}
          style={colorStyle.background}
        >
          {elem.code}
        </Link>
      </li>,
    )
  })

  return (
    <div className={areacode.codeListContainer}>
      <ul className={areacode.codeList}>{codes}</ul>
    </div>
  )
}

export function AllCode3digit({ closeFunc }: { closeFunc?: () => void }) {
  const codeLists = []

  for (let i = 1; i <= 9; i++) {
    codeLists.push(
      <li key={i} onClick={closeFunc}>
        {Code3digit(i)}
      </li>,
    )
  }

  return <ul className={areacode.allCodeListContainer}>{codeLists}</ul>
}
