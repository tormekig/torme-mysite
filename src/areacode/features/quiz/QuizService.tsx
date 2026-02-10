import React, { useState } from 'react'
import quiz from 'areacode/assets/css/quiz.module.scss'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { QuizComponent } from './components/QuizComponent'
import { QuizGenerator, quizMode } from './QuizGenerator'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'

export type quizStatus = 'stop' | 'inProgress'

function QuizService() {
  const [quizStatus, setQuizStatus] = useState<quizStatus>('stop')
  const [questions, setQuestions] = useState<
    (MAChoiceMAQuestion | InputCityQuestion)[]
  >([])

  const [choiceRange, setChoiceRange] = useState('-1')

  const [displayParam, setDisplayParam] = useState([
    '市区町村',
    '一部地域詳細表示',
  ])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (displayParam.includes(e.target.value)) {
  //     setDisplayParam(
  //       displayParam.filter((checkedValue) => checkedValue !== e.target.value),
  //     )
  //   } else {
  //     setDisplayParam([...displayParam, e.target.value])
  //   }
  // }

  function startQuiz(mode: quizMode) {
    const newQuestions: (MAChoiceMAQuestion | InputCityQuestion)[] =
      new QuizGenerator(mode).generateQuizSet(choiceRange)

    if (
      mode.questionType === '4DigitsNum' &&
      mode.inputType === 'input' &&
      mode.answerType === 'city'
    ) {
      setDisplayParam(['番号領域', ...displayParam])
    }

    setQuestions(newQuestions)
    setQuizStatus('inProgress')
  }

  function stopQuiz() {
    setQuestions([])
    setQuizStatus('stop')
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
          {/* <div className={'MAList.checkBtnContainer'}>
            <CheckBtnItems
              handleChange={handleChange}
              displayParam={displayParam}
              isQuiz={true}
            />
          </div> */}
          <div className={quiz.startQuizContainer}>
            <h2>番号領域 → MA 3択クイズ</h2>
            <div className={quiz.choiceContainer}>
              <h3>3択の範囲</h3>
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
            <button
              style={{ backgroundColor: '#C35579' }}
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: 'MANumRange',
                  inputType: 'choice',
                  answerType: 'MA',
                })
              }
            >
              Start
            </button>
          </div>
          <div className={quiz.startQuizContainer}>
            <h2>番号領域 → 市町村 入力クイズ</h2>
            <button
              style={{ backgroundColor: '#C35579' }}
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: 'MANumRange',
                  inputType: 'input',
                  answerType: 'city',
                })
              }
            >
              Start
            </button>
          </div>
          <div className={quiz.startQuizContainer}>
            <h2>番号4桁 → 市町村 入力クイズ</h2>
            <button
              style={{ backgroundColor: '#C35579' }}
              type="button"
              onClick={() =>
                startQuiz({
                  questionType: '4DigitsNum',
                  inputType: 'input',
                  answerType: 'city',
                })
              }
            >
              Start
            </button>
          </div>
        </div>
      )}

      {quizStatus !== 'stop' && (
        <div>
          <button type="button" onClick={() => stopQuiz()}>
            最初から遊ぶ
          </button>
          <QuizComponent questions={questions} displayParam={displayParam} />
        </div>
      )}
    </div>
  )
}

export default QuizService
