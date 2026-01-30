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

export class QuizController {
  private state: QuizState
  private questions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[]

  constructor(questions: (MAChoiceMAQuestion | Digit4NumInputCityQuestion)[]) {
    this.questions = questions
    this.state = {
      currentQuestionIndex: 0,
      isFinished: false,
      isCorrect: null,
      showNext: false,
      correctList: [],
      correctInputs: [[], [], [], [], []],
    }
  }

  getState() {
    return this.state
  }

  currentQuestion() {
    return this.questions[this.state.currentQuestionIndex]
  }

  nextQuestion(): void {
    if (this.state.currentQuestionIndex + 1 === this.questions.length) {
      this.state = {
        ...this.state,
        showNext: false,
        isFinished: true,
      }
    } else {
      this.state = {
        ...this.state,
        isCorrect: null,
        showNext: false,
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
      }
    }
  }

  checkChoiceAnswer(selectedIndex: number) {
    const question = this.currentQuestion()
    if (!(question instanceof MAChoiceMAQuestion)) return

    const isCorrect = selectedIndex === question.correctAnswerIndex
    this.currentQuestion().userInput = selectedIndex

    const updatedCorrectList = isCorrect
      ? [...this.state.correctList, this.state.currentQuestionIndex]
      : [...this.state.correctList]

    this.state = {
      ...this.state,
      isCorrect,
      showNext: true,
      correctList: updatedCorrectList,
    }
  }

  decideIsCorrectForInputAnswer() {
    this.state = {
      ...this.state,
      showNext: true,
    }
  }

  checkInputAnswer(inputName: string) {
    const question = this.currentQuestion()
    if (!(question instanceof Digit4NumInputCityQuestion)) return

    if (inputName === '') return

    const currentCorrectInputList =
      this.state.correctInputs[this.state.currentQuestionIndex]

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
}
