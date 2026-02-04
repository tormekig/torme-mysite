import quiz from 'areacode/assets/css/quiz.module.scss'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import {
  Digit4NumInputCityQuestion,
  InputCityQuestion,
  MAInputCityQuestion,
} from 'areacode/models/Digit4NumQuestion'
import QuestionArg from './MAAreaCodeQuizComponent'
import { QuizCtx } from '../quizTypes'
import { QuestionInteractionComponent } from './QuestionInteractionComponent'
import { MACompInfo } from 'areacode/data/MACompList'

export function QuestionComponent({
  question,
  ctx,
}: {
  question: MAChoiceMAQuestion | InputCityQuestion
  ctx: QuizCtx
}): JSX.Element {
  const { state, controller, handleStateChange, questions } = ctx

  let subject: string | MACompInfo = ''
  if (question instanceof Digit4NumInputCityQuestion) {
    subject = question.areacode
  } else if (question instanceof MAInputCityQuestion) {
    subject = question.MAs[0]
  } else if (question instanceof MAChoiceMAQuestion) {
    subject = question.getMA()
  }

  return (
    <div className={quiz.question}>
      <div>
        {!state.isFinished &&
          `${state.currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
      </div>
      <QuestionArg arg={subject} />
      <div className={quiz.answers}>
        <QuestionInteractionComponent question={question} ctx={ctx} />
      </div>
      {state.showNext && (
        <>
          {state.isCorrect != null && (
            <div className="feedback">
              {state.isCorrect ? '正解！' : '不正解…'}
            </div>
          )}
          <button
            onClick={() => {
              controller.setNextStatus()
              handleStateChange()
            }}
          >
            次へ
          </button>
        </>
      )}
    </div>
  )
}
