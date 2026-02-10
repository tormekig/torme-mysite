import { AreaCode, NumberBands } from 'areacode/pages/detail'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import quiz from 'areacode/assets/css/quiz.module.scss'
import React from 'react'
import {
  Digit4NumInputCityQuestion,
  InputCityQuestion,
  MAInputCityQuestion,
} from 'areacode/models/Digit4NumQuestion'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'

function QuestionArg({
  question,
}: {
  question: MAChoiceMAQuestion | InputCityQuestion
}) {
  if (question instanceof InputCityQuestion) {
    if (question instanceof Digit4NumInputCityQuestion) {
      return (
        <div className={quiz.digit4Question}>
          <AreaCode areaCode={question.transformedAreacode} isQuiz={true} />
        </div>
      )
    } else if (question instanceof MAInputCityQuestion) {
      let info = new MAInfoDetail(question.getMA())
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
  } else if (question instanceof MAChoiceMAQuestion) {
    let info = new MAInfoDetail(question.getMA())

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
  return <></>
}

export default QuestionArg
