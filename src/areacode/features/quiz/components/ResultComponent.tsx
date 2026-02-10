import quiz from 'areacode/assets/css/quiz.module.scss'
import { QuizCtx } from '../quizTypes'
import { QuestionComponent } from './QuestionComponent'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'

export function ResultComponent({ ctx }: { ctx: QuizCtx }): JSX.Element {
  const { controller, questions } = ctx
  return (
    <div className={quiz.resultContainer}>
      <h2>結果発表</h2>
      {questions[0] instanceof MAChoiceMAQuestion && (
        <div className={quiz.resultNumber}>
          {questions.length} 問中 {controller.getCorrectAnswerIndex().length}{' '}
          問正解
        </div>
      )}
      {questions.map((question, i) => {
        return (
          <div key={i}>
            <QuestionComponent question={question} ctx={ctx} />
          </div>
        )
      })}
    </div>
  )
}
