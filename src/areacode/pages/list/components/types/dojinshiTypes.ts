import { CityInfo } from 'areacode/data/cityList'

export type FormattedMAComp = {
  ma: string
  head4digits: string
  numberBands: string
  formattedCities: {
    main: string[]
    sub: string
  }
  cities: CityInfo[]
}

export type FormattedData = {
  maComps: FormattedMAComp[]
}

export type TextExportData = {
  formatted: FormattedData
  text: string
  multiMACombinedCities: string
}

export type CSVExportResult = {
  noMA: string
  oneMA: string
  twoMA: string
  multiMA: string
  allMA: string
}

export type RememberWord = {
  areacode: string
  word: string
}
