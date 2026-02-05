import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'
import { checkMatchingCityName } from 'areacode/data/cityList'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'

export type QuizState = {
  currentQuestionIndex: number
  isFinished: boolean
  isCorrect: boolean | null
  showNext: boolean
}

export class QuizController {
  private state: QuizState
  private questions: (MAChoiceMAQuestion | InputCityQuestion)[]

  constructor(questions: (MAChoiceMAQuestion | InputCityQuestion)[]) {
    this.questions = questions
    this.state = {
      currentQuestionIndex: 0,
      isFinished: false,
      isCorrect: null,
      showNext: false,
    }
  }

  getState() {
    return this.state
  }

  currentQuestion() {
    return this.questions[this.state.currentQuestionIndex]
  }

  setNextStatus(): void {
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

    const isCorrect = question.judgeAndSetIsAnswer(selectedIndex)

    this.state = {
      ...this.state,
      isCorrect,
      showNext: true,
    }
  }

  getCorrectAnswerIndex() {
    return this.questions.filter((question) => {
      if (question instanceof MAChoiceMAQuestion) {
        return question.getIsAnswerCorrect()
      }
      return false
    })
  }

  decideIsCorrectForInputAnswer() {
    this.state = {
      ...this.state,
      showNext: true,
    }
  }

  checkInputAnswer(question: InputCityQuestion, inputName: string) {
    if (inputName === '') return

    const cities = MAInfoDetail.getCitiesByMultipleMAComps(question.MAs)

    const searchedCities = cities.filter(function (city) {
      return checkMatchingCityName(city, inputName)
    })

    console.log(question, inputName, searchedCities)

    question.pushCityInputs(searchedCities)
  }
}
