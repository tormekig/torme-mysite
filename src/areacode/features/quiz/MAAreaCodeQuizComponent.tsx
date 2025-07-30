import { MACompInfo } from 'areacode/data/MACompList'
import { AreaCode, NumberBands } from 'areacode/pages/detail'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import React from 'react'

function MAAreaCodeQuestion({ MAComp }: { MAComp: MACompInfo }) {
  const info = new MAInfoDetail(MAComp)

  return (
    <div className="MA-question">
      <AreaCode areaCode={info.areaCode} />
      <NumberBands areaCode={info.areaCode} numberBands={info.numberBands} />
    </div>
  )
}

export default MAAreaCodeQuestion
