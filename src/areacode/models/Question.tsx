import { MACompInfo } from 'areacode/data/MACompList'

export interface Question {
  correctAnswerIndex?: number
  subject: MACompInfo
  choices: MACompInfo[]
  questionIndex: number
  userInput?: number
}

export interface QuestionData {
  correctAnswerIndex?: number
  subject: MACompInfo
  choices: MACompInfo[]
  questionIndex?: number
}
