import React from 'react'
import { useState, useEffect } from 'react'
import './styles.css'
import MAAreaCodeQuestion from './MAAreaCodeQuizComponent'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import { CitiesSimple } from 'areacode/pages/detail'
import { Question } from './Quiz'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'

type AnswerButton = {
  disabled?: boolean
  className?: string
}[]

function Main({
  questions,
  isVisibleCities,
  choiceRange,
}: {
  questions: Question[]
  isVisibleCities: boolean
  choiceRange: string
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
  }, [currentQuestionIndex])

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
          className: 'correct',
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
          className: 'incorrect',
        },
        [parseInt(correctAnswer) - 1]: {
          className: 'correct',
        },
      }))

      setIsCorrect(false)
      setIsIncorrect(true)
      setIncorrectList(incorrectList)
      setShowNextQuestionButton(true)
    }
    setUserInput(userInputCopy)
  }

  const renderAnswers = (question: Question, answerButtons: AnswerButton) => {
    const { answers, correctAnswer } = question

    if (answers === undefined || correctAnswer === undefined)
      throw Error('answers are undefined')

    const onClickAnswer = (index: number) => {
      checkAnswer(index + 1, correctAnswer)
    }

    return answers.map((answer, i: number) => (
      <div key={i} className="answerBtn-container">
        {answerButtons[i] !== undefined ? (
          <button
            type="button"
            disabled={answerButtons[i].disabled || false}
            className={`${answerButtons[i].className} answerBtn btn`}
            onClick={() => onClickAnswer(i)}
          >
            <AnswerChoiceContent answer={answer} />
          </button>
        ) : (
          <button
            type="button"
            className={`answerBtn btn`}
            onClick={() => onClickAnswer(i)}
          >
            <AnswerChoiceContent answer={answer} />
          </button>
        )}
      </div>
    ))
  }

  function AnswerChoiceContent({ answer: answerMAComp }: { answer: number }) {
    const displayParam = [
      '市外局番',
      '番号領域',
      '都道府県',
      'MA名',
      '市区町村',
    ]
    const info = new MACompListContent().filter('MA', `${answerMAComp}`)
    return (
      <>
        <div className="answer-text">
          {/* {answerMAComp.MAName} ({answerMAComp.pref}) */}
        </div>
        {/* {isVisibleCities && <CitiesSimple classifiedCities={info.cities} />} */}
      </>
    )
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
    <div className="result-container">
      <h2 className="result-header">結果発表</h2>
      <div className="result-number">
        {questions.length} 問中 {correctList.length} 問正解
      </div>
      <div>
        <button className="btn" onClick={() => window.location.reload()}>
          もう一度遊ぶ
        </button>
      </div>
      {questions.map((question, i) => {
        return <div key={i}>{renderQuestion(question, i)}</div>
      })}
    </div>
  )

  const renderAnswerInResult = (question: Question, userInputIndex: number) => {
    const { answers, correctAnswer } = question
    if (answers === undefined || correctAnswer === undefined)
      throw Error('answers are undefined')
    return answers.map((answer, i) => {
      let answerBtnCorrectClassName =
        `${i + 1}` === correctAnswer ? 'correct' : ''
      let answerBtnIncorrectClassName =
        `${userInputIndex}` !== correctAnswer &&
        `${i + 1}` === `${userInputIndex}`
          ? 'incorrect'
          : ''
      return (
        <div key={i} className="answerBtn-container">
          <button
            type="button"
            disabled
            className={`answerBtn btn ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            <AnswerChoiceContent answer={answer} />
          </button>
        </div>
      )
    })
  }

  function renderQuestion(question: Question, i: number = 0) {
    return (
      <div className="question">
        <InstantFeedback
          question={question}
          isCorrect={isCorrect}
          isIncorrect={isIncorrect}
        />
        <div>
          {!isFinishedQuiz &&
            `${currentQuestionIndex + 1} / ${questions.length}:`}
        </div>
        {question && <MAAreaCodeQuestion MAComp={question.subject} />}
        <div className="answers">
          {question && !isFinishedQuiz && renderAnswers(question, [buttons])}
          {isFinishedQuiz && renderAnswerInResult(question, userInput[i])}
        </div>
        {showNextQuestionButton && (
          <button
            onClick={() => nextQuestion(currentQuestionIndex)}
            className="nextQuestionBtn btn"
          >
            次へ
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="question-container">
      {!isFinishedQuiz && renderQuestion(activeQuestion)}
      {isFinishedQuiz && renderResult()}
    </div>
  )
}

export default Main
