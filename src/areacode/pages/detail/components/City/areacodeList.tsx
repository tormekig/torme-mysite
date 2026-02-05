import { CityInfo } from '../../../../data/cityList'
import { ColorStyle } from '../../../../components'
import { Link } from 'react-router-dom'
import MAList from '../../../../assets/css/MAList.module.scss'
import {
  classifyCities,
  createCityElement,
  getDuplicationCities,
  LimitedCitiesOption,
} from './tools'

export type cityOptions = {
  areaDisplayFull?: boolean
  isQuiz?: boolean
  limitedCitiesOption?: LimitedCitiesOption
}

export function Cities({
  cities,
  colorStyle,
  options,
}: {
  cities: CityInfo[]
  colorStyle: ColorStyle
  options: cityOptions
}): JSX.Element {
  const {
    areaDisplayFull = undefined,
    isQuiz = false,
    limitedCitiesOption = undefined,
  } = options

  const isCityClickable = !isQuiz

  if (!limitedCitiesOption?.isDisplayElse && limitedCitiesOption?.cities) {
    cities = getDuplicationCities(cities, limitedCitiesOption.cities)
  }

  let classifiedCities = classifyCities(cities)

  const displayCities = (pref: string, county: string) => {
    const elems: React.JSX.Element[] = []

    classifiedCities[pref][county].forEach(function (city, i) {
      if (city.name === '') return

      elems.push(
        createCityElement(
          city,
          i,
          colorStyle,
          isCityClickable,
          areaDisplayFull,
          isQuiz,
          limitedCitiesOption,
        ),
      )
    })

    return <ul>{elems}</ul>
  }

  const displayCounties = (pref: string) => {
    const counties: React.JSX.Element[] = []

    Object.keys(classifiedCities[pref]).forEach(function (county, i) {
      const li = county ? (
        <li className={MAList.cityListwithBorder} key={i}>
          <div className={MAList.countyName}>{county}</div>
          {displayCities(pref, county)}
        </li>
      ) : (
        <li className={MAList.cityList} key={i}>
          <div>{county}</div>
          {displayCities(pref, county)}
        </li>
      )

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
