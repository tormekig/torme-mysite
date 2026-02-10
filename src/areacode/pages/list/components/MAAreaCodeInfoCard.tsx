import React from 'react'
import {
  AreaCode,
  Cities,
  cityOptions,
  MA,
  NumberBands,
  Pref,
} from 'areacode/pages/detail'
import MAList from 'areacode/assets/css/MAList.module.scss'
import { MACompInfo } from 'areacode/data/MACompList'
import { getColorStyleByAreaCode } from 'areacode/components'
import { MAInfoDetail } from './MAInfoDetail'

export function MAAreaCodeInfoCard({
  MAComp,
  displayParam,
  cityOptions,
}: {
  MAComp: MACompInfo
  displayParam: string[]
  cityOptions: cityOptions
}) {
  const isQuiz = cityOptions?.isQuiz || false
  const info = new MAInfoDetail(MAComp)
  const colorStyle = getColorStyleByAreaCode(info.areaCode)

  return (
    <div className={`${MAList.infoBlock}`}>
      <div>
        <div className={MAList.areacodeNumberband}>
          {displayParam.includes('市外局番') && (
            <AreaCode
              areaCode={info.areaCode}
              colorStyle={colorStyle}
              isQuiz={isQuiz}
            />
          )}

          {displayParam.includes('番号領域') && (
            <NumberBands
              areacode={info.areaCode}
              numberBands={info.numberBands}
            />
          )}
        </div>

        <div className={MAList.mApref}>
          {displayParam.includes('都道府県') && <Pref pref={info.pref} />}
          {displayParam.includes('MA名') && <MA ma={info.ma} />}
        </div>

        {displayParam.includes('市区町村') && (
          <div className={MAList.citiesContainer}>
            <Cities
              cities={info.cities}
              colorStyle={colorStyle}
              options={cityOptions}
            />
          </div>
        )}

        {(displayParam.includes('MA独立番号') ||
          displayParam.includes('番号区画コード') ||
          displayParam.includes('方形区画')) && (
          <div className={MAList.infoTableContainer}>
            <table>
              <tbody>
                {displayParam.includes('MA独立番号') && (
                  <tr>
                    <td>MA独立番号</td>
                    <td>{info.maDistinct}</td>
                  </tr>
                )}

                {displayParam.includes('番号区画コード') && (
                  <tr>
                    <td>番号区画コード</td>
                    <td>{info.compartmentCode}</td>
                  </tr>
                )}

                {displayParam.includes('方形区画') && (
                  <tr>
                    <td>方形区画</td>
                    <td>{info.square}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export function MAAreaCodeInfoCards({
  MAComps,
  displayParam,
  cityOptions,
}: {
  MAComps: MACompInfo[]
  displayParam: string[]
  cityOptions: cityOptions
}) {
  return (
    <>
      {MAComps.map((MAComp, i) => {
        return (
          <div className={MAList.infoBlockContainer}>
            <MAAreaCodeInfoCard
              key={i}
              MAComp={MAComp}
              displayParam={displayParam}
              cityOptions={cityOptions}
            />
          </div>
        )
      })}
    </>
  )
}
