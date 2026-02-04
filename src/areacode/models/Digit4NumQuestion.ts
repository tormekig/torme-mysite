import { CityInfo } from 'areacode/data/cityList'
import { MACompInfo } from 'areacode/data/MACompList'

export abstract class InputCityQuestion {
  abstract MAs: MACompInfo[]
  questionIndex?: number
  userInputCities: CityInfo[]

  constructor() {
    this.userInputCities = []
  }

  setQuestionIndex(index: number) {
    this.questionIndex = index
    return this
  }

  pushCityInputs(city: CityInfo[]) {
    this.userInputCities.push(...city)
  }
}

export class MAInputCityQuestion extends InputCityQuestion {
  MAs: MACompInfo[]

  constructor(subject: MACompInfo[]) {
    super()
    this.MAs = subject
  }
}
export class Digit4NumInputCityQuestion extends InputCityQuestion {
  MAs: MACompInfo[]
  areacode: string
  transformedAreacode: string

  constructor(areacode: string, transformedAreacode: string, subject: MACompInfo[]) {
    super()
    this.areacode = areacode
    this.transformedAreacode = transformedAreacode
    this.MAs = subject
  }
}