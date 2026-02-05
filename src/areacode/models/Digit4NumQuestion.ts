import { checkMatchingCityName, CityInfo } from 'areacode/data/cityList'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAInfoDetail } from 'areacode/pages/list/components/MAInfoDetail'

export abstract class InputCityQuestion {
  abstract MAs: MACompInfo[]
  questionIndex?: number
  userInputCities: CityInfo[]
  answerCities?: CityInfo[]

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

  checkInputAnswer(inputName: string) {
    if (inputName === '') return
    if (this.answerCities === undefined) return

    const searchedCities = this.answerCities?.filter(function (city) {
      return checkMatchingCityName(city, inputName)
    })

    this.pushCityInputs(searchedCities)
  }
}

export class MAInputCityQuestion extends InputCityQuestion {
  MAs: MACompInfo[]

  constructor(subject: MACompInfo[]) {
    super()
    if (subject.length !== 1) {
      console.error("The Length of MAs must be 1 in MAInputCityQuestion")
      this.MAs = []
      return
    }
    this.MAs = subject
    this.answerCities = MAInfoDetail.getCitiesByMultipleMAComps(this.MAs)
  }

  getMA(): MACompInfo {
    return this.MAs[0]
  }
}

export class Digit4NumInputCityQuestion extends InputCityQuestion {
  MAs: MACompInfo[]
  areacode: string
  transformedAreacode: string

  constructor(areacode: string, transformedAreacode: string, MAs: MACompInfo[]) {
    super()
    this.areacode = areacode
    this.transformedAreacode = transformedAreacode
    this.MAs = MAs
    this.answerCities = MAInfoDetail.getCitiesByMultipleMAComps(this.MAs)
  }
}