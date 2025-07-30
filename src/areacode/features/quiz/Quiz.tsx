import React, { useState } from 'react'
import Main from './QuizMain'
import './styles.css'
import generateQuizSet from './generateQuiz'
import { MACompInfo } from 'areacode/data/MACompList'

const CORRECT_ANSWER = '1'

export type Question = {
  correctAnswer?: string
  answers?: number[]
  subject: MACompInfo
  choices: MACompInfo[]
}

const shuffleAnswer = (oldQuestions: Question[]) => {
  const newQuestions: Question[] = oldQuestions.map((question) => {
    if (question.answers === undefined) question.answers = []
    const answerWithIndex = question.answers.map((ans, i) => [ans, i])
    const shuffledAnswersWithIndex = answerWithIndex.sort(
      () => Math.random() - 0.5,
    )
    const shuffledAnswers = shuffledAnswersWithIndex.map((ans) => ans[0])

    const newCorrectAnswer =
      shuffledAnswersWithIndex.findIndex(
        (ans) => `${ans[1] + 1}` === `${CORRECT_ANSWER}`,
      ) + 1

    return {
      ...question,
      correctAnswer: `${newCorrectAnswer}`,
      answers: shuffledAnswers,
    }
  })

  return newQuestions
}

function Quiz() {
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const [isVisibleCities, setIsVisibleCities] = useState(true)
  const [choiceRange, setChoiceRange] = useState('-1')

  function startQuiz() {
    let newQuestions: Question[] = generateQuizSet(
      'areacodeToMAName',
      choiceRange,
    )

    newQuestions = shuffleAnswer(newQuestions)

    newQuestions = newQuestions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    }))

    setQuestions(newQuestions)
    setIsGameInProgress(true)
  }

  const changeIsVisibleCities = () => {
    setIsVisibleCities(!isVisibleCities)
  }

  const changeChoiceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, choiceRange)
    setChoiceRange(event.target.value)
  }

  const radioButtons = [
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
    <div className="MAAreaCode-container quiz-container">
      {!isGameInProgress && (
        <div>
          <div className="start-choice">
            <input
              type="checkbox"
              checked={isVisibleCities}
              onChange={() => changeIsVisibleCities()}
            />{' '}
            市町村名を表示
          </div>
          <div className="choice-container">
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
          <div className="startQuizBtn-container">
            <button
              type="button"
              onClick={() => startQuiz()}
              className="startQuizBtn btn"
            >
              Start
            </button>
          </div>
        </div>
      )}

      {isGameInProgress && (
        <Main
          questions={questions}
          isVisibleCities={isVisibleCities}
          choiceRange={choiceRange}
        />
      )}
    </div>
  )
}

export default Quiz
