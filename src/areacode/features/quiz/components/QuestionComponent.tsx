import quiz from 'areacode/assets/css/quiz.module.scss'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import QuestionArg from './MAAreaCodeQuizComponent'
import { QuizCtx } from '../quizTypes'
import { QuestionInteractionComponent } from './QuestionInteractionComponent'

export function QuestionComponent({
  question,
  ctx,
}: {
  question: MAChoiceMAQuestion | InputCityQuestion
  ctx: QuizCtx
}): JSX.Element {
  const { state, controller, handleStateChange, questions } = ctx

  return (
    <div className={quiz.question}>
      <div>
        {!state.isFinished &&
          `${state.currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
      </div>
      <QuestionArg question={question} />
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
