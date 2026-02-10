import cityList, { CityInfo } from 'areacode/data/cityList'
import { MACompInfo } from 'areacode/data/MACompList'
import NumberBandList from 'areacode/data/numberBandList'
import { NumberBandInfo } from 'areacode/pages/detail'
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
  cities: CityInfo[]

  constructor(MAComp: MACompInfo) {
    this.areaCode = `0${MAComp.areaCode}`
    this.ma = MAComp.MAName
    this.maDistinct = MAComp.MAnum
    this.compartmentCode = convertCompCode(MAComp)
    this.pref = MAComp.pref
    this.square = MAComp.square
    this.numberBands = MAInfoDetail.getNumberBands(MAComp)
    this.numberDesignations = [
      {
        start: 'None',
        end: 'None',
        note: [],
      },
    ]
    this.cities = MAInfoDetail.getCities(MAComp)
  }

  static getNumberBands(MAComp: MACompInfo) {
    return NumberBandList.filter(
      (band) =>
        `${band.MA}${band.areaCode}` === `${MAComp.MAName}${MAComp.areaCode}`,
    )
  }

  static getCities(MAComp: MACompInfo) {
    return cityList.filter(
      (city) => city.compartmentCode === convertCompCode(MAComp),
    )
  }

  static getCitiesByMultipleMAComps(MAComps: MACompInfo[]) {
    let cities: CityInfo[] = []
    MAComps.forEach((MAComp) => {
      cities = cities.concat(this.getCities(MAComp))
    })
    return cities
  }
}
