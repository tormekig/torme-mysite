import { MACompInfo } from 'areacode/data/MACompList'

export interface Question {
  correctAnswer?: string
  subject: MACompInfo
  choices: MACompInfo[]
  questionIndex?: number
}
