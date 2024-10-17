import cityList from 'areacode/data/cityList'
import { MACompInfo } from 'areacode/data/MACompList'
import NumberBandList from 'areacode/data/numberBandList'
import {
  ClassifiedCities,
  classifyCities,
  NumberBandInfo,
} from 'areacode/pages/detail'
import { convertCompCode } from '..'

interface NumberDesignation {
  start: string
  end: string
  note: []
}

export class MAInfoDetail {
  areaCode: string
  ma: string
  maDistinct: string
  compartmentCode: string
  pref: string
  square: string
  numberBands: NumberBandInfo[]
  numberDesignations: NumberDesignation[]
  cities: ClassifiedCities
  color: string

  constructor(MAComp: MACompInfo) {
    this.areaCode = '0' + MAComp.areaCode
    this.ma = MAComp.MAName
    this.maDistinct = MAComp.MAnum
    this.compartmentCode = convertCompCode(MAComp)
    this.pref = MAComp.pref
    this.square = MAComp.square
    this.numberBands = this.getNumberBandsfromMAComp(MAComp)
    this.numberDesignations = [
      {
        start: 'None',
        end: 'None',
        note: [],
      },
    ]
    this.cities = classifyCities(this.getCitiesfromMAComp(MAComp))
    this.color = MAComp.color

    return this
  }

  getNumberBandsfromMAComp(MAComp: MACompInfo) {
    return NumberBandList.filter(function (numberBand) {
      return (
        numberBand.MA + numberBand.areaCode === MAComp.MAName + MAComp.areaCode
      )
    })
  }

  getCitiesfromMAComp(MAComp: MACompInfo) {
    return cityList.filter(function (city) {
      return city.compartmentCode === convertCompCode(MAComp)
    })
  }
}
