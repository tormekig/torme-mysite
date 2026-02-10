import { MAChoiceMAQuestion } from 'areacode/models/MAQuestion'
import { InputCityQuestion } from 'areacode/models/Digit4NumQuestion'
import { QuizController, QuizState } from './QuizController'

export type QuizCtx = {
  controller: QuizController
  state: QuizState
  inputValue: string
  setInputValue: (v: string) => void
  handleStateChange: () => void
  displayParam: string[]
  questions: (MAChoiceMAQuestion |InputCityQuestion)[]
}
