import quiz from 'areacode/assets/css/quiz.module.scss'
import { Question } from 'areacode/models/Question'

import MAAreaCodeQuestion from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'
import { QuizStrategy } from './QuizStrategy'
import { quizMode } from './QuizService'
import { useState } from 'react'

export function QuizComponent({
  mode,
  questions,
  displayParam,
}: {
  mode: quizMode
  questions: Question[]
  displayParam: string[]
}) {
  const [inputValue, setInputValue] = useState('')

  const {
    state,
    currentQuestion,
    checkChoiceAnswer,
    checkInputAnswer,
    decideIsCorrectForInputAnswer,
    nextQuestion,
  } = QuizStrategy(questions)

  const {
    isFinished,
    isCorrect,
    showNext,
    currentQuestionIndex,
    correctInputs,
  } = state

  function renderQuestion(question: Question): JSX.Element {
    const isResult = isFinished || showNext

    return (
      <div className={quiz.question}>
        <div>
          {!isFinished &&
            `${currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
        </div>
        <MAAreaCodeQuestion MAComp={question.subject} />
        <div className={quiz.answers}>
          {mode === 'numToMAChoice' && renderChoices(question, isResult)}
          {mode === 'numToCityName' && renderInput(question, isResult)}
        </div>
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
      checkChoiceAnswer(index + 1)
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

  function renderInput(
    question: Question,
    isResult: boolean = false,
  ): JSX.Element {
    const onClickAnswer = () => {
      checkInputAnswer(inputValue)
      setInputValue('')
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      onClickAnswer()
    }

    const limitedCitiesOption = {
      cities: correctInputs[currentQuestionIndex],
      isDisplayElse: isResult,
    }

    return (
      <div className={quiz.answerBtnContainer}>
        {!isFinished && (
          <div>
            <div className="{areacode.searchCityTextContainer}">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isResult}
              />
            </div>
            <div>
              <button
                type="button"
                disabled={isResult}
                className={`${quiz.answerBtn}`}
                onClick={() => onClickAnswer()}
              >
                回答
              </button>
              <button
                type="button"
                disabled={isResult}
                className={`${quiz.answerBtn}`}
                onClick={() => decideIsCorrectForInputAnswer()}
              >
                答えを見る
              </button>
            </div>
          </div>
        )}
        <MAAreaCodeInfoCard
          MAComp={question.subject}
          displayParam={displayParam}
          isQuiz={true}
          limitedCitiesOption={limitedCitiesOption}
        />
      </div>
    )
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
