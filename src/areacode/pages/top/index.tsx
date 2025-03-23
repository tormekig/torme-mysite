import React from 'react'

import areacode from 'areacode/assets/css/areacode.module.scss'

import { ScrollTop } from 'utils/tools'
import { Appendix } from './appendix'
import {
  Header,
  AllPref,
  SearchCity,
  SearchPushNumber,
  Code3digit,
} from '../../components'

const Top = () => {
  return (
    <div className={areacode.areacodeBody}>
      <ScrollTop />
      <Header />
      <div className={areacode.mainContent}>
        <div className={areacode.maAreaCodeContainer}>
          <div className={areacode.searchBox}>
            <SearchPushNumber />
          </div>
          <Code3digit />
          <SearchCity />
          <AllPref />
          <Appendix />
          <div className={areacode.copyrightContainer}>
            <p>Copyright 2023-2025 torme_kig All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top
