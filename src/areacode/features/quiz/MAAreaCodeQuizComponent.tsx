import { MACompInfo } from 'areacode/data/MACompList'
import { AreaCode, NumberBands } from 'areacode/pages/detail'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import quiz from 'areacode/assets/css/quiz.module.scss'
import React from 'react'

function MAAreaCodeQuestion({ MAComp }: { MAComp: MACompInfo }) {
  const info = new MAInfoDetail(MAComp)

  return (
    <div className={quiz.maQuestion}>
      <AreaCode areaCode={info.areaCode} isQuiz={true} />
      <NumberBands
        areacode={info.areaCode}
        numberBands={info.numberBands}
        isQuiz={true}
      />
    </div>
  )
}

export default MAAreaCodeQuestion
