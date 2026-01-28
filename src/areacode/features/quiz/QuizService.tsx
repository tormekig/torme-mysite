import React, { useState } from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'
import { CheckBtnItems } from 'areacode/pages/list/header'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { QuizComponent } from './QuizComponent'
import { QuizFactory } from './factories/QuizFactory'
import { Digit4NumInputCityQuestion } from 'areacode/models/Digit4NumQuestion'

export type quizStatus = 'stop' | 'inProgress'

type questionType = 'MANumRange' | '4DigitsNum'
type inputType = 'choice' | 'input'
type answerType = 'MA' | 'city'

export type quizMode = {
  questionType: questionType
  inputType: inputType
  answerType: answerType
}

function QuizService() {
  const [quizStatus, setQuizStatus] = useState<quizStatus>('stop')
  const [quizMode, setQuizMode] = useState<quizMode>({
    questionType: 'MANumRange',
    inputType: 'choice',
    answerType: 'MA',
  })
  const [questions, setQuestions] = useState<
    (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[]
  >([])

  const [choiceRange, setChoiceRange] = useState('-1')

  const [displayParam, setDisplayParam] = useState([
    '市区町村',
    '一部地域詳細表示',
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (displayParam.includes(e.target.value)) {
      setDisplayParam(
        displayParam.filter((checkedValue) => checkedValue !== e.target.value),
      )
    } else {
      setDisplayParam([...displayParam, e.target.value])
    }
  }

  function startQuiz(mode: quizMode) {
    const newQuestions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[] =
      new QuizFactory()
        .generateQuizSet(mode, choiceRange)
        .map((question, index) => question.setQuestionIndex(index + 1))

    setQuestions(newQuestions)
    setQuizMode(mode)
    setQuizStatus('inProgress')
  }

  const changeChoiceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoiceRange(event.target.value)
  }

  const radioButtons: { label: string; value: string }[] = [
    {
      label: '全て',
      value: '-1',
    },
    {
      label: '同一都道府県',
      value: '0',
    },
    {
      label: '市外局番2桁',
      value: '1',
    },
    {
      label: '市外局番3桁',
      value: '2',
    },
    {
      label: '市外局番4桁',
      value: '3',
    },
  ]

  return (
    <div className={quiz.quizContainer}>
      {quizStatus === 'stop' && (
        <div>
          <div className={'MAList.checkBtnContainer'}>
            <CheckBtnItems
              handleChange={handleChange}
              displayParam={displayParam}
              isQuiz={true}
            />
          </div>
          <div className={quiz.choiceContainer}>
            <h3>出題範囲</h3>
            {radioButtons.map((radio, i) => {
              return (
                <div key={i} className="start-choice">
                  <label>
                    <input
                      type="radio"
                      name="choiceRange"
                      value={radio.value}
                      checked={radio.value === choiceRange}
                      onChange={changeChoiceRange}
                    />
                    {radio.label}
                  </label>
                </div>
              )
            })}
          </div>
          <div className={quiz.startQuizBtnContainer}>
            <button
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: 'MANumRange',
                  inputType: 'choice',
                  answerType: 'MA',
                })
              }
            >
              番号 → MA 3択クイズ Start
            </button>
          </div>
          <div className={quiz.startQuizBtnContainer}>
            <button
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: 'MANumRange',
                  inputType: 'input',
                  answerType: 'city',
                })
              }
            >
              番号 → 市町村 入力クイズ Start
            </button>
          </div>
          <div className={quiz.startQuizBtnContainer}>
            <button
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: '4DigitsNum',
                  inputType: 'input',
                  answerType: 'city',
                })
              }
            >
              番号4桁 → 市町村 入力クイズ Start
            </button>
          </div>
        </div>
      )}

      {quizStatus !== 'stop' && (
        <QuizComponent
          mode={quizMode}
          questions={questions}
          displayParam={displayParam}
        />
      )}
    </div>
  )
}

export default QuizService
