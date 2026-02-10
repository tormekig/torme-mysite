import {
  formatCitiesForDojinshi,
  formatNumberBands,
  isCityLimitedZone,
} from 'areacode/pages/detail'
import { MACompInfo } from 'areacode/data/MACompList'
import { MAInfoDetail } from '../MAInfoDetail'
import { FormattedData, FormattedMAComp, TextExportData } from '../types/dojinshiTypes'

export class AreaCodeFormatter {
  static transform(code: string): string {
    const transformationMap: Record<string, string> = {
      '0112': '011',
      '0331': '03',
      '0442': '044',
      '0452': '045',
      '0522': '052',
      '0641': '06',
      '0752': '075',
      '0782': '078',
    }

    return transformationMap[code] ?? code
  }

  static formatMAComponents(MAComps: MACompInfo[]): FormattedData {
    return {
      maComps: MAComps.map((MAComp) => this.formatSingleMAComponent(MAComp)),
    }
  }

  private static formatSingleMAComponent(MAComp: MACompInfo): FormattedMAComp {
    const info = new MAInfoDetail(MAComp)
    return {
      ma: info.ma,
      numberBands: formatNumberBands(info.areaCode, info.numberBands)
        .map((numberBand) => numberBand.txt + numberBand.elim)
        .join(', '),
      head4digits: MAComp.head4digits,
      cities: info.cities,
      formattedCities: formatCitiesForDojinshi(info.cities),
    }
  }

  static formatToTextData(
    areacode: string,
    transformedAreacode: string,
    word: string,
    MAComps: MACompInfo[],
  ): TextExportData {
    const formatted = this.formatMAComponents(MAComps)

    const maCompsText = formatted.maComps
      .map((maComp) => {
        return maComp.head4digits === areacode
          ? `${maComp.ma} ${maComp.numberBands}<br>${maComp.formattedCities.main.join('<br>')};${maComp.formattedCities.sub}`
          : `${maComp.ma}(${maComp.head4digits}を参照);`
      })
      .join(';')

    const multiMACombinedCities = this.formatMultiMACombinedCities(formatted)

    return {
      formatted,
      text: `${transformedAreacode};${word};${maCompsText}`,
      multiMACombinedCities: `${transformedAreacode};${word};${multiMACombinedCities}`,
    }
  }

  private static formatMultiMACombinedCities(formatted: FormattedData): string {
    const allCitiesBy4digits = this.collectAllCitiesFrom4Digits(formatted)
    const uniqueCityCodes = Array.from(
      new Set(allCitiesBy4digits.map((c) => c.code)),
    )

    const mas = formatted.maComps.map((maComp) => maComp.ma).join('、')
    let multiOrSingle =
      formatted.maComps.length > 1 ? '複' : formatted.maComps.length === 0 ? '' : '単'

    const multiMACombinedCities = uniqueCityCodes.map((code) => {
      const f = allCitiesBy4digits.filter((c) => c.code === code)
      return this.formatCityInfo(f)
    })

    const classifiedCities = this.classifyCitiesByCounty(multiMACombinedCities)
    const multiMACombinedCitiesText = this.formatClassifiedCities(classifiedCities)

    return `${mas};${multiOrSingle};${multiMACombinedCitiesText.join('、')}`
  }

  private static collectAllCitiesFrom4Digits(formatted: FormattedData) {
    const allCitiesBy4digits: any[] = []
    formatted.maComps.forEach((maComp) => {
      if (maComp.cities) allCitiesBy4digits.push(...maComp.cities)
    })
    return allCitiesBy4digits
  }

  private static formatCityInfo(cities: any[]) {
    const suffix = (
      cities.filter(
        (c) =>
          isCityLimitedZone(c.zone.name) === 'excluded' ||
          isCityLimitedZone(c.zone.name) === 'none',
      ).length !== 0
    ) ? '' : `(一部)`
    return {
      county: `${cities[0].county.name}${cities[0].county.type}`,
      city: `${cities[0].name}${cities[0].type}${suffix}`,
    }
  }

  private static classifyCitiesByCounty(
    multiMACombinedCities: Array<{ county: string; city: string }>,
  ): Record<string, string[]> {
    const classifiedCities: Record<string, string[]> = {}
    multiMACombinedCities.forEach((city) => {
      if (city.city === '' || city.city === '特別区部') return

      const county = city.county
      if (!(county in classifiedCities)) {
        classifiedCities[county] = []
      }
      classifiedCities[county].push(city.city)
    })
    return classifiedCities
  }

  private static formatClassifiedCities(
    classifiedCities: Record<string, string[]>,
  ): string[] {
    return Object.keys(classifiedCities).map((county) => {
      return county.endsWith('市')
        ? `${county}（${classifiedCities[county].join('、')}）`
        : classifiedCities[county].join('、')
    })
  }
}
