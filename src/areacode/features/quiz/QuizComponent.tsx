import quiz from 'areacode/assets/css/quiz.module.scss'
import { Question } from 'areacode/models/Question'

import MAAreaCodeQuestion from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'
import { QuizStrategy } from './QuizStrategy'

export function QuizComponent({
  questions,
  displayParam,
}: {
  questions: Question[]
  displayParam: string[]
}) {
  const { state, currentQuestion, checkAnswer, nextQuestion } =
    QuizStrategy(questions)

  const { isFinished, isCorrect, showNext, currentQuestionIndex } = state

  function renderQuestion(question: Question): JSX.Element {
    const isResult = isFinished || showNext

    return (
      <div className={quiz.question}>
        <div>
          {!isFinished &&
            `${currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
        </div>
        <MAAreaCodeQuestion MAComp={question.subject} />
        <div className={quiz.answers}>{renderChoices(question, isResult)}</div>
        {showNext && (
          <>
            {isCorrect != null && (
              <div className="feedback">{isCorrect ? '正解！' : '不正解…'}</div>
            )}
            <button onClick={() => nextQuestion()} className={`${quiz.btn}`}>
              次へ
            </button>
          </>
        )}
      </div>
    )
  }

  function renderChoices(
    question: Question,
    isResult: boolean = false,
  ): JSX.Element[] {
    const { choices, correctAnswerIndex } = question

    if (choices === undefined || correctAnswerIndex === undefined)
      throw Error('answers are undefined')

    const onClickAnswer = (index: number) => {
      checkAnswer(index + 1)
    }

    return choices.map((choiceMAComp: MACompInfo, i: number) => {
      const answerBtnCorrectClassName =
        isResult && i + 1 === correctAnswerIndex ? quiz.correct : ''
      const answerBtnIncorrectClassName =
        isResult &&
        question.userInput !== correctAnswerIndex &&
        i + 1 === question.userInput
          ? quiz.incorrect
          : ''

      return (
        <div key={i} className={quiz.answerBtnContainer}>
          <button
            type="button"
            disabled={isResult}
            className={`${quiz.answerBtn} ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
            onClick={() => onClickAnswer(i)}
          >
            <MAAreaCodeInfoCard
              MAComp={choiceMAComp}
              displayParam={displayParam}
              isQuiz={true}
            />
          </button>
        </div>
      )
    })
  }

  function renderResult(): JSX.Element {
    return (
      <div className={quiz.resultContainer}>
        <h2>結果発表</h2>
        <div className={quiz.resultNumber}>
          {questions.length} 問中 {state.correctList.length} 問正解
        </div>
        <div>
          <button className={quiz.btn} onClick={() => window.location.reload()}>
            もう一度遊ぶ
          </button>
        </div>
        {questions.map((question, i) => {
          return <div key={i}>{renderQuestion(question)}</div>
        })}
      </div>
    )
  }

  return <>{!isFinished ? renderQuestion(currentQuestion()) : renderResult()}</>
}
