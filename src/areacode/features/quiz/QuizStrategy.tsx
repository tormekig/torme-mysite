import { useState } from 'react'
import { Question } from 'areacode/models/Question'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import {
  CityInfo,
  getCityName,
  getPrefCityName,
  getPrefCountyCityName,
} from 'areacode/data/cityList'

export type QuizState = {
  currentQuestionIndex: number
  isFinished: boolean
  isCorrect: boolean | null
  showNext: boolean
  correctList: number[]
  correctInputs: CityInfo[][]
}

export function QuizStrategy(questions: Question[]) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    isFinished: false,
    isCorrect: null,
    showNext: false,
    correctList: [],
    correctInputs: [[], [], [], [], []],
  })

  function currentQuestion() {
    return questions[state.currentQuestionIndex]
  }

  function nextQuestion(): void {
    if (state.currentQuestionIndex + 1 === questions.length) {
      setState({
        ...state,
        showNext: false,
        isFinished: true,
      })
    } else {
      setState({
        ...state,
        isCorrect: null,
        showNext: false,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      })
    }
  }

  function checkChoiceAnswer(selectedIndex: number) {
    const isCorrect = selectedIndex === currentQuestion().correctAnswerIndex
    currentQuestion().userInput = selectedIndex

    const updatedCorrectList = isCorrect
      ? [...state.correctList, state.currentQuestionIndex]
      : [...state.correctList]

    setState({
      ...state,
      isCorrect,
      showNext: true,
      correctList: updatedCorrectList,
    })
  }

  function decideIsCorrectForInputAnswer() {
    setState({
      ...state,
      showNext: true,
    })
  }

  function checkInputAnswer(inputName: string) {
    if (inputName === '') return

    const currentCorrectInputList =
      state.correctInputs[state.currentQuestionIndex]

    const cities = MAInfoDetail.getCities(currentQuestion().subject)

    const searchedCities = cities.filter(function (city) {
      return (
        getCityName(city).indexOf(inputName) === 0 ||
        getPrefCityName(city).indexOf(inputName) === 0 ||
        getPrefCountyCityName(city).indexOf(inputName) === 0
      )
    })

    currentCorrectInputList.push(...searchedCities)
  }

  return {
    state,
    currentQuestion,
    checkChoiceAnswer,
    checkInputAnswer,
    decideIsCorrectForInputAnswer,
    nextQuestion,
  }
}
