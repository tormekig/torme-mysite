import { CityInfo } from 'areacode/data/cityList'
import { classifyCities, isCityLimitedZone } from './tools'

export function formatCitiesForDojinshi(cities: CityInfo[]): {
  main: string[]
  sub: string
  mainWithoutPref: string[]
} {
  const classified = classifyCities(cities)
  const zones: string[] = []
  const results: string[] = []
  const resultsWithoutPref: string[] = []

  for (const pref of Object.keys(classified)) {
    const counties = classified[pref]
    const countyTexts: string[] = []

    for (const county of Object.keys(counties)) {
      const cities: { name: string; zoneMark: string }[] = []

      counties[county].forEach((city) => {
        if (!city.name) return

        let zoneMark = ''
        if (city.zone.name) {
          const mark =
            isCityLimitedZone(city.zone.name) === 'excluded' ? '◎' : '△'
          zoneMark = `(${mark})`
          zones.push(`${zoneMark}${city.zone.name}`)
        }

        cities.push({
          name: `${city.name}${city.type}`,
          zoneMark,
        })
      })

      const cityText = cities.map((c) => `${c.name}${c.zoneMark}`).join(' / ')
      const countyResult = county.endsWith('市')
        ? `${county}(${cityText})`
        : cityText
      countyTexts.push(countyResult)
    }

    results.push(`[${pref}] ${countyTexts.join(' / ')}`)
  }

  return {
    main: results,
    sub: zones.join(','),
    mainWithoutPref: resultsWithoutPref,
  }
}

export function CitiesForDojinshi({ cities }: { cities: CityInfo[] }) {
  const text = formatCitiesForDojinshi(cities)

  return (
    <>
      {text.main.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {text.sub ? <small>{text.sub}</small> : null}
    </>
  )
}
