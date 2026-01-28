import { useState } from 'react'
import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import {
  CityInfo,
  getCityName,
  getCityNameType,
  getPrefCityNameType,
  getPrefCountyCityNameType,
} from 'areacode/data/cityList'
import { Digit4NumInputCityQuestion } from 'areacode/models/Digit4NumQuestion'

export type QuizState = {
  currentQuestionIndex: number
  isFinished: boolean
  isCorrect: boolean | null
  showNext: boolean
  correctList: number[]
  correctInputs: CityInfo[][]
}

export function QuizStrategy(
  questions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[],
) {
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
    const question = currentQuestion()
    if (!(question instanceof MAChoiceMAQuestion)) return

    const isCorrect = selectedIndex === question.correctAnswerIndex
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
    const question = currentQuestion()
    if (!(question instanceof Digit4NumInputCityQuestion)) return

    if (inputName === '') return

    const currentCorrectInputList =
      state.correctInputs[state.currentQuestionIndex]

    const cities = MAInfoDetail.getCitiesByMultipleMAComps(question.subject)

    const searchedCities = cities.filter(function (city) {
      return (
        getCityName(city) === inputName ||
        getCityNameType(city) === inputName ||
        getPrefCityNameType(city) === inputName ||
        getPrefCountyCityNameType(city) === inputName
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
