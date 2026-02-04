import quiz from 'areacode/assets/css/quiz.module.scss'
import { QuizCtx } from '../quizTypes'
import { QuestionComponent } from './QuestionComponent'

export function ResultComponent({ ctx }: { ctx: QuizCtx }): JSX.Element {
  const { controller, questions } = ctx
  return (
    <div className={quiz.resultContainer}>
      <h2>結果発表</h2>
      <div className={quiz.resultNumber}>
        {questions.length} 問中 {controller.getCorrectAnswerIndex().length}{' '}
        問正解
      </div>
      <div>
        <button onClick={() => window.location.reload()}>もう一度遊ぶ</button>
      </div>
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
