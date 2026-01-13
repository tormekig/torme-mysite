import { CityInfo } from 'areacode/data/cityList'
import { classifyCities } from './tools'

export function formatCitiesForDojinshi(cities: CityInfo[]): {
  main: string[]
  sub: string
} {
  const classified = classifyCities(cities)
  const zones: string[] = []
  const results: string[] = []

  for (const pref of Object.keys(classified)) {
    const counties = classified[pref]
    const countyTexts: string[] = []

    for (const county of Object.keys(counties)) {
      const cityTexts: string[] = []

      counties[county].forEach((city) => {
        if (!city.name) return

        let zoneMark = ''
        if (city.zone.name) {
          const zoneName = city.zone.name
          const numbering = zones.length + 1
          let mark = ''
          if (
            zoneName.endsWith('を除く。') ||
            zoneName.endsWith('を除く｡ ') ||
            zoneName.endsWith('を除く｡')
          ) {
            mark = '◎'
          } else {
            mark = '△'
          }
          zoneMark = `${mark}${numbering}`
          zones.push(`${zoneMark}${zoneName}`)
        }

        cityTexts.push(`${city.name}${city.type}${zoneMark}`)
      })

      const cityText = cityTexts.join(' / ')
      const countyResult = county.endsWith('市')
        ? `${county}(${cityText})`
        : cityText
      countyTexts.push(countyResult)
    }

    results.push(`[${pref}] ${countyTexts.join(' / ')}`)
  }

  return { main: results, sub: zones.join(',') }
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
