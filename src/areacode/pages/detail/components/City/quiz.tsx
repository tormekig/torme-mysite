import { ClassifiedCities, getZoneElement } from './tools'
import MAList from '../../../../assets/css/MAList.module.scss'

export function CitiesForQuiz({
  classifiedCities,
}: {
  classifiedCities: ClassifiedCities
}): JSX.Element {
  const displayCities = (pref: string, county: string) => {
    const cities: React.JSX.Element[] = []

    classifiedCities[pref][county].forEach(function (city, i) {
      if (city.name === '') return

      const zone = getZoneElement(city.zone.name, undefined, true)

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
      const li = county ? (
        <li className={MAList.cityListwithBorder} key={i}>
          <div>{county}</div>（{displayCities(pref, county)}）
        </li>
      ) : (
        <li className={MAList.cityList} key={i}>
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
