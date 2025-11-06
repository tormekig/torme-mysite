import React from 'react'
import { useState, useEffect } from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'

import MAAreaCodeQuestion from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'
import { Question } from 'areacode/models/Question'

type AnswerButtons = {
  [key: number]: {
    disabled?: boolean
    className?: string
  }
}

function QuizStrategy({
  questions,
  displayParam,
}: {
  questions: Question[]
  displayParam: string[]
}): JSX.Element {
  const [isCorrect, setIsCorrect] = useState(true)
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false)

  const [isFinishedQuiz, setIsFinishedQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [buttons, setButtons] = useState({})
  const [correctList, setCorrectList] = useState<number[]>([])

  let userInput: number[] = []

  function getCurrentQuestion(): Question {
    return questions[currentQuestionIndex]
  }

  function nextQuestion(currentQuestionIndex: number): void {
    setIsCorrect(false)
    setShowNextQuestionButton(false)
    setButtons({})

    if (currentQuestionIndex + 1 === questions.length) {
      setIsFinishedQuiz(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  function checkAnswer(index: number, correctAnswer: string): void {
    const indexStr = `${index}`
    const disabledAll = {
      0: { disabled: true },
      1: { disabled: true },
      2: { disabled: true },
      3: { disabled: true },
    }
    const userInputCopy = [...userInput]

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index
    }

    if (indexStr === correctAnswer) {
      correctList.push(currentQuestionIndex)

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: `${quiz.correct}`,
        },
      }))

      setIsCorrect(true)
      setCorrectList(correctList)
    } else {
      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: `${quiz.incorrect}`,
        },
        [parseInt(correctAnswer) - 1]: {
          className: `${quiz.correct}`,
        },
      }))

      setIsCorrect(false)
    }
    setShowNextQuestionButton(true)
    userInput = userInputCopy
  }

  function renderAnswers(
    question: Question,
    answerButtons: AnswerButtons,
  ): JSX.Element[] {
    const { choices, correctAnswer } = question

    if (choices === undefined || correctAnswer === undefined)
      throw Error('answers are undefined')

    const onClickAnswer = (index: number) => {
      checkAnswer(index + 1, correctAnswer)
    }

    return choices.map((choiceMAComp: MACompInfo, i: number) => (
      <div key={i} className={quiz.answerBtnContainer}>
        {answerButtons[i] !== undefined ? (
          <button
            type="button"
            disabled={answerButtons[i].disabled || false}
            className={`${answerButtons[i].className} ${quiz.answerBtn} ${quiz.btn}`}
            onClick={() => onClickAnswer(i)}
          >
            <MAAreaCodeInfoCard
              MAComp={choiceMAComp}
              displayParam={displayParam}
              isQuiz={true}
            />
          </button>
        ) : (
          <button
            type="button"
            className={`${quiz.answerBtn} ${quiz.btn}`}
            onClick={() => onClickAnswer(i)}
          >
            <MAAreaCodeInfoCard
              MAComp={choiceMAComp}
              displayParam={displayParam}
              isQuiz={true}
            />
          </button>
        )}
      </div>
    ))
  }

  function InstantFeedback({ isCorrect }: { isCorrect: boolean }): JSX.Element {
    return (
      <>
        {isCorrect ? (
          <div className="feedback">正解！</div>
        ) : (
          <div className="feedback">不正解…</div>
        )}
      </>
    )
  }

  function renderResult(): JSX.Element {
    return (
      <div className={quiz.resultContainer}>
        <h2>結果発表</h2>
        <div className={quiz.resultNumber}>
          {questions.length} 問中 {correctList.length} 問正解
        </div>
        <div>
          <button className={quiz.btn} onClick={() => window.location.reload()}>
            もう一度遊ぶ
          </button>
        </div>
        {questions.map((question, i) => {
          return <div key={i}>{renderQuestion(question, i)}</div>
        })}
      </div>
    )
  }

  function renderAnswerInResult(
    question: Question,
    userInputIndex: number,
  ): JSX.Element[] {
    const { choices, correctAnswer } = question
    if (choices === undefined || correctAnswer === undefined)
      throw Error('answers are undefined')
    return choices.map((choiceMAComp, i) => {
      let answerBtnCorrectClassName =
        `${i + 1}` === correctAnswer ? quiz.correct : ''
      let answerBtnIncorrectClassName =
        `${userInputIndex}` !== correctAnswer &&
        `${i + 1}` === `${userInputIndex}`
          ? quiz.incorrect
          : ''
      return (
        <div key={i} className={quiz.answerBtnContainer}>
          <button
            type="button"
            disabled
            className={`${quiz.answerBtn} ${quiz.btn} ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
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

  function renderQuestion(question: Question, i: number = 0): JSX.Element {
    return (
      <div className={quiz.question}>
        <div>
          {!isFinishedQuiz &&
            `${currentQuestionIndex + 1} 問目 / 全 ${questions.length} 問`}
        </div>
        {question && <MAAreaCodeQuestion MAComp={question.subject} />}
        <div className={quiz.answers}>
          {question && !isFinishedQuiz && renderAnswers(question, buttons)}
          {isFinishedQuiz && renderAnswerInResult(question, userInput[i])}
        </div>
        {showNextQuestionButton && (
          <>
            <InstantFeedback isCorrect={isCorrect} />
            <button
              onClick={() => nextQuestion(currentQuestionIndex)}
              className={`${quiz.btn}`}
            >
              次へ
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {!isFinishedQuiz && renderQuestion(getCurrentQuestion())}
      {isFinishedQuiz && renderResult()}
    </>
  )
}

export default QuizStrategy
