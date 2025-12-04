import React from 'react'
import { AreaCode, Cities, MA, NumberBands, Pref } from 'areacode/pages/detail'
import MAList from 'areacode/assets/css/MAList.module.scss'
import MACompList, { MACompInfo } from 'areacode/data/MACompList'
import {
  getColorStyleByAreaCode,
  getColorStyleForQuiz,
} from 'areacode/components'
import { MAInfoDetail } from './MAInfoDetail'
import { MACompListContent } from '../MACompListContent'

export function MAAreaCodeInfoDojinshi({
  areacode,
  MAComps,
}: {
  areacode: string
  MAComps: MACompInfo[]
}) {
  const colorStyle = getColorStyleByAreaCode(areacode)
  return (
    <div className={`${MAList.infoDojinshi}`}>
      <div className={MAList.areacode}>
        {<AreaCode areaCode={areacode} colorStyle={colorStyle} />}
      </div>

      <div className={MAList.mApref}>
        <div className={MAList.words}>覚え方</div>
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
                    <Cities
                      cities={info.cities}
                      areaDisplayFull={false}
                      colorStyle={colorStyle}
                    />
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

export function MAAreaCodeInfoDojinshis() {
  const elem = []
  const all = []
  for (let i = 100; i < 1000; i++) {
    const query = `0${i.toString()}`
    const MAComps = MACompListContent.filterMACompListByPrefixAreaCode(query)
    all.push(...MAComps)
    // console.log(query, MAComps.length)
    if (MAComps.length === 0) {
      const colorStyle = getColorStyleByAreaCode(query)
      elem.push(
        <div className={MAList.infoBlockContainer} key={i}>
          <div className={`${MAList.infoDojinshi}`}>
            <div className={MAList.areacode}>
              {<AreaCode areaCode={query} colorStyle={colorStyle} />}
            </div>

            <div className={MAList.mApref}></div>
          </div>
        </div>,
      )
    } else {
      elem.push(
        <div className={MAList.infoBlockContainer} key={i}>
          <MAAreaCodeInfoDojinshi areacode={`${query}`} MAComps={MAComps} />
        </div>,
      )
    }
  }
  const a = [...new Set(all)]
  console.log(all ,a, a.length)
  return <>{elem}</>
}
