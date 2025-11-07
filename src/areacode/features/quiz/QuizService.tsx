import React, { useState } from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'
import { CheckBtnItems } from 'areacode/pages/list/header'
import { Question } from 'areacode/models/Question'
import { QuizFactory } from 'areacode/factories/QuizFactory'
import { QuizComponent } from './QuizComponent'

function QuizService() {
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

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

  function startQuiz() {
    const newQuestions: Question[] = new QuizFactory()
      .generateQuizSet('areacodeToMAName', choiceRange)
      .map((question, index) => ({
        ...question,
        questionIndex: index + 1,
      }))

    setQuestions(newQuestions)
    setIsGameInProgress(true)
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
      {!isGameInProgress && (
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
              onClick={() => startQuiz()}
              className={quiz.btn}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {isGameInProgress && (
        <QuizComponent questions={questions} displayParam={displayParam} />
      )}
    </div>
  )
}

export default QuizService
