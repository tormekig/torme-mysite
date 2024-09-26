import React from 'react'
import { Link } from 'react-router-dom'
import MAList from '../../../assets/css/MAList.module.scss'
import { CityInfo } from '../../../data/cityList'
import { ColorStyle } from '../../../components'

export interface ClassifiedCities {
  [key: string]: {
    [key: string]: CityInfo[]
  }
}

export function classifyCities(cities: CityInfo[]) {
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

export function Cities({
  classifiedCities,
  areaDisplayFull,
  colorStyle,
}: {
  classifiedCities: ClassifiedCities
  areaDisplayFull?: boolean
  colorStyle: ColorStyle
}) {
  const displayCities = (pref: string, county: string) => {
    const cities: React.JSX.Element[] = []

    classifiedCities[pref][county].forEach(function (city, i) {
      if (city.name === '') return false

      const cityFullTxt =
        city.pref + city.county.name + city.county.type + city.name + city.type

      let zone = null
      if (city.zone.name) {
        zone = <small> ({city.zone.name})</small>
        if (!areaDisplayFull) {
          zone = <small>※</small>
        }
      }

      cities.push(
        <Link
          to={`/areacode/city/${cityFullTxt}`}
          className={MAList.city}
          style={colorStyle.background}
          key={i}
        >
          {city.name}
          {city.type}
          {zone}
        </Link>,
      )
    })

    return <ul>{cities}</ul>
  }

  const displayCounties = (pref: string) => {
    const counties: React.JSX.Element[] = []

    Object.keys(classifiedCities[pref]).forEach(function (county, i) {
      let li = null
      if (county) {
        li = (
          <li className={MAList.cityListwithBorder} key={i}>
            <div className={MAList.countyName}>{county}</div>
            {displayCities(pref, county)}
          </li>
        )
      } else {
        li = (
          <li className={MAList.cityList} key={i}>
            <div>{county}</div>
            {displayCities(pref, county)}
          </li>
        )
      }
      counties.push(li)
    })

    return <ul className={MAList.countyList}>{counties}</ul>
  }

  const displayPref = () => {
    const prefs: React.JSX.Element[] = []

    Object.keys(classifiedCities).forEach(function (pref, i) {
      prefs.push(
        <li className={MAList.prefList} key={i}>
          <div className={MAList.prefofCities}>
            <Link to={`/areacode/pref/${pref}`} style={colorStyle.text}>
              {pref}
            </Link>
          </div>
          {displayCounties(pref)}
        </li>,
      )
    })

    return <ul>{prefs}</ul>
  }

  return <div>{displayPref()}</div>
}

export function CitiesSimple({
  classifiedCities,
}: {
  classifiedCities: ClassifiedCities
}) {
  const displayCities = (pref: string, county: string) => {
    const cities: React.JSX.Element[] = []

    classifiedCities[pref][county].forEach(function (city, i) {
      if (city.name === '') return false

      const zone = city.zone.name ? <small> (一部)</small> : null

      cities.push(
        <span className={MAList.city} key={i}>
          {city.name}
          {city.type}
          {zone}
          {classifiedCities[pref][county].length - 1 !== i && <>、</>}
        </span>,
      )
    })

    return <ul>{cities}</ul>
  }

  const displayCounties = (pref: string) => {
    const counties: React.JSX.Element[] = []

    Object.keys(classifiedCities[pref]).forEach(function (county, i) {
      let li = null
      if (county) {
        li = (
          <li className={MAList.cityListwithBorder} key={i}>
            <div>{county}</div>（{displayCities(pref, county)}）
          </li>
        )
      } else {
        li = (
          <li className={MAList.cityList} key={i}>
            {displayCities(pref, county)}
          </li>
        )
      }
      counties.push(li)
    })

    return <ul className={MAList.countyList}>{counties}</ul>
  }

  const displayPref = () => {
    const prefs: React.JSX.Element[] = []

    Object.keys(classifiedCities).forEach(function (pref, i) {
      prefs.push(
        <li className={MAList.prefListSimple} key={i}>
          <div className={MAList.prefofCities}>
            <p>{pref}</p>
          </div>
          {displayCounties(pref)}
        </li>,
      )
    })

    return <ul>{prefs}</ul>
  }

  return <div>{displayPref()}</div>
}
