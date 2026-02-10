import React from 'react'
import { Link } from 'react-router-dom'
import MAList from '../../../../assets/css/MAList.module.scss'
import { CityInfo } from '../../../../data/cityList'
import { ColorStyle, getCityColorStyleForQuiz } from '../../../../components'
import { getDuplication } from 'utils/tools'

export function isCityLimitedZone(
  zoneName: string,
): 'limited' | 'excluded' | 'none' {
  if (!zoneName) return 'none'
  if (
    zoneName.endsWith('を除く。') ||
    zoneName.endsWith('を除く｡ ') ||
    zoneName.endsWith('を除く｡')
  )
    return 'excluded'
  return 'limited'
}

export interface LimitedCitiesOption {
  cities: CityInfo[]
  isDisplayElse: boolean
}

export interface ClassifiedCities {
  [key: string]: {
    [key: string]: CityInfo[]
  }
}

export function getDuplicationCities(cities1: CityInfo[], cities2: CityInfo[]) {
  return getDuplication(cities1, cities2, 'code')
}

export function compressWards(
  classifiedCities: ClassifiedCities,
): ClassifiedCities {
  console.log(classifiedCities)
  return classifiedCities
}

export function classifyCities(cities: CityInfo[]): ClassifiedCities {
  const classifiedCities: ClassifiedCities = {}

  for (const city of cities) {
    if (!(city.pref in classifiedCities)) {
      classifiedCities[city.pref] = {}
    }

    const county =
      city.county.note !== ''
        ? `${city.county.name}${city.county.type}（${city.county.note}）`
        : `${city.county.name}${city.county.type}`

    if (!(county in classifiedCities[city.pref])) {
      classifiedCities[city.pref][county] = []
    }

    classifiedCities[city.pref][county].push(city)
  }

  return classifiedCities
}

export function getZoneElement(
  zoneName: string,
  areaDisplayFull?: boolean,
  forQuiz = false,
) {
  if (!zoneName) return null
  if (forQuiz) return <small> (一部)</small>
  return areaDisplayFull ? <small> ({zoneName})</small> : <small>※</small>
}

export function createCityElement(
  city: CityInfo,
  i: number,
  colorStyle: ColorStyle,
  isClickable: boolean,
  areaDisplayFull?: boolean,
  isQuiz = false,
  limitedCitiesOption?: LimitedCitiesOption,
) {
  const cityFullTxt =
    city.pref + city.county.name + city.county.type + city.name + city.type

  const color =
    limitedCitiesOption?.cities?.includes(city) || !isQuiz
      ? colorStyle
      : getCityColorStyleForQuiz()

  const zone = getZoneElement(city.zone.name, areaDisplayFull, isQuiz)

  if (isClickable) {
    return (
      <Link
        to={`/areacode/city/${cityFullTxt}`}
        className={MAList.city}
        style={color.background}
        key={i}
      >
        {city.name}
        {city.type}
        {zone}
      </Link>
    )
  }

  return (
    <span className={MAList.city} style={color.background} key={i}>
      {city.name}
      {city.type}
      {zone}
    </span>
  )
}
