import React from 'react'
import areacode from 'areacode/assets/css/areacode.module.scss'
import { Link } from 'react-router-dom'
import { Code2digit } from './numberTable'

export function Header() {
  return (
    <div className={areacode.headerContainer}>
      <div className={areacode.headerContent}>
        <div className={areacode.headerLeft}>
          <Link to={`/areacode`} className={areacode.linkTitle}>
            市外局番手帳
          </Link>
          <Link to={`/areacode/quiz`} className={areacode.linkQuiz}>
            クイズ
          </Link>
          {/* <Link to={`/areacode/random`} className={areacode.linkRandom}>ランダム</Link> */}
        </div>
        <div>
          <Code2digit />
        </div>
      </div>
    </div>
  )
}

export default Header
