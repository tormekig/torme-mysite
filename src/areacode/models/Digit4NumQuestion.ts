import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { InputQuestion } from './Question'
import { MACompInfo } from 'areacode/data/MACompList'
import { transformAreaCode } from 'areacode/pages/list/components/MAAreaCodeInfoDojinshi'

export class Digit4NumInputCityQuestion implements InputQuestion<MACompInfo[], string> {
  areacode: string
  transformedAreacode: string
  subject: MACompInfo[]
  questionIndex?: number
  userInput?: string[]

  constructor(code: string) {
    this.areacode = code
    this.transformedAreacode = transformAreaCode(code)
    this.subject = MACompListContent.filterMACompListByPrefixAreaCode(this.transformedAreacode)
    return this
  }

  setQuestionIndex(index: number) {
    this.questionIndex = index
    return this
  }
}
