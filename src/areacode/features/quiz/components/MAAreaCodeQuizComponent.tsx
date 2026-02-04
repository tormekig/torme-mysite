import { MACompInfo } from 'areacode/data/MACompList'
import { AreaCode, NumberBands } from 'areacode/pages/detail'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import quiz from 'areacode/assets/css/quiz.module.scss'
import React from 'react'

function QuestionArg({ arg }: { arg: MACompInfo | string }) {
  if (typeof arg === 'string') {
    return (
      <div className={quiz.maQuestion}>
        <AreaCode areaCode={arg} isQuiz={true} />
      </div>
    )
  }

  const info = new MAInfoDetail(arg)

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

export default QuestionArg
