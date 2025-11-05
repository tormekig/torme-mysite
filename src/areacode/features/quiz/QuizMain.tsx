import React from 'react'
import { useState, useEffect } from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'

import MAAreaCodeQuestion from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { Question } from './Quiz'
import { MAAreaCodeInfoCard } from 'areacode/pages/list/components'

type AnswerButtons = {
  [key: number]: {
    disabled?: boolean
    className?: string
  }
}

function Main({
  questions,
  displayParam,
}: {
  questions: Question[]
  displayParam: string[]
}) {
  const [isCorrect, setIsCorrect] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false)

  const [isFinishedQuiz, setIsFinishedQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [buttons, setButtons] = useState({})
  const [correctList, setCorrectList] = useState<number[]>([])
  const [incorrectList, setIncorrectList] = useState<number[]>([])
  const [userInput, setUserInput] = useState<number[]>([])

  const [activeQuestion, setActiveQuestion] = useState(
    questions[currentQuestionIndex],
  )

  useEffect(() => {
    setActiveQuestion(questions[currentQuestionIndex])
  }, [currentQuestionIndex, questions])

  const nextQuestion = (currentQuestionIndex: number) => {
    setIsIncorrect(false)
    setIsCorrect(false)
    setShowNextQuestionButton(false)
    setButtons({})

    if (currentQuestionIndex + 1 === questions.length) {
      setIsFinishedQuiz(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const checkAnswer = (index: number, correctAnswer: string) => {
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
      setIsIncorrect(false)
      setCorrectList(correctList)
      setShowNextQuestionButton(true)
    } else {
      incorrectList.push(currentQuestionIndex)

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
      setIsIncorrect(true)
      setIncorrectList(incorrectList)
      setShowNextQuestionButton(true)
    }
    setUserInput(userInputCopy)
  }

  const renderAnswers = (question: Question, answerButtons: AnswerButtons) => {
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

  function InstantFeedback({
    isIncorrect,
    isCorrect,
    question,
  }: {
    isIncorrect: boolean
    isCorrect: boolean
    question: Question
  }) {
    return (
      <>
        {isIncorrect && <div className="feedback">不正解…</div>}
        {isCorrect && <div className="feedback">正解！</div>}
      </>
    )
  }

  const renderResult = () => (
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

  const renderAnswerInResult = (question: Question, userInputIndex: number) => {
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

  function renderQuestion(question: Question, i: number = 0) {
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
            <InstantFeedback
              question={question}
              isCorrect={isCorrect}
              isIncorrect={isIncorrect}
            />
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
      {!isFinishedQuiz && renderQuestion(activeQuestion)}
      {isFinishedQuiz && renderResult()}
    </>
  )
}

export default Main
