import { shuffleArray } from '../../../utils/tools'
import { convertCompCode } from '.'
import MACompList, { MACompInfo } from '../../data/MACompList'
import cityList, {
  getCityListByPref,
  getCityName,
  getPrefCountyCityName,
  getPrefCountyCityNameKanaWithSlash,
  getPrefCountyName,
} from '../../data/cityList'
import { HeaderInfo } from './header'

export type SearchType =
  | 'MA'
  | 'pref'
  | 'city'
  | 'code'
  | 'code_prefix'
  | 'all'
  | 'random'
type areacodeFilterWithQuery = (q: string) => MACompListContent
type areacodeFilter = () => MACompListContent

export class MACompListContent {
  headerInfo: HeaderInfo = new HeaderInfo()
  MAComps: MACompInfo[] = []

  public init(query?: string) {
    this.headerInfo.init(query)
    return this
  }

  public setQueryAndSub(query: string, sub: string) {
    this.headerInfo.mainHeader = query
    this.headerInfo.subHeader = sub
    return this
  }

  private filterByMA: areacodeFilterWithQuery = (query: string) => {
    this.setQueryAndSub(query, 'MA名検索')

    this.MAComps = MACompList.concat().filter(function (MAComp) {
      return MAComp.MAName === query
    })

    return this
  }

  private filterByPref: areacodeFilterWithQuery = (query: string) => {
    this.setQueryAndSub(query, '都道府県名検索')

    let MAComps: MACompInfo[] = []

    const cityListByPref = getCityListByPref(query)

    cityListByPref.forEach(function (city) {
      const MAtemp = MACompList.concat().filter((m) => {
        return convertCompCode(m) === city.compartmentCode
      })
      MAComps = MAComps.concat(MAtemp)
    })

    MAComps = [...new Set(MAComps)]

    MAComps.sort((a, b) => (+a.MAnum > +b.MAnum ? 1 : -1))

    this.MAComps = MAComps

    return this
  }

  private filterByCity: areacodeFilterWithQuery = (query: string) => {
    this.setQueryAndSub(query, '市町村名検索')

    let MAComps: MACompInfo[] = []

    const cities = cityList.filter(function (city) {
      return getPrefCountyCityName(city) === query
    })

    cities.forEach(function (city) {
      const MAtemp = MACompList.concat().filter((m) => {
        return convertCompCode(m) === city.compartmentCode
      })
      MAComps = MAComps.concat(MAtemp)
    })

    this.MAComps = MAComps

    this.headerInfo.mainHeaderSub = getPrefCountyName(cities[0])
    this.headerInfo.mainHeader = getCityName(cities[0])
    this.headerInfo.mainHeaderRuby = getPrefCountyCityNameKanaWithSlash(
      cities[0],
    )
    this.headerInfo.mainHeaderLink =
      'https://www.google.com/maps/place/' + query

    return this
  }

  private filterByExactAreacode: areacodeFilterWithQuery = (query: string) => {
    this.setQueryAndSub(query, '市外局番検索（完全一致）')

    query = query.slice(1, query.length)
    this.MAComps = MACompList.concat().filter(function (MAComp) {
      return MAComp.areaCode === query
    })

    return this
  }

  private filterByPrefixAreacode: areacodeFilterWithQuery = (query: string) => {
    this.setQueryAndSub(query, '市外局番検索（前方一致）')

    query = query.slice(1, query.length)
    this.MAComps = MACompList.concat().filter(function (MAComp) {
      return MAComp.areaCode.slice(0, query.length) === query
    })

    return this
  }

  private all: areacodeFilter = () => {
    this.init('全て')

    this.MAComps = MACompList.concat()

    return this
  }

  private random: areacodeFilter = () => {
    this.init('ランダム表示')

    this.MAComps = shuffleArray(MACompList.concat()).slice(0, 1)

    return this
  }

  public filter(type: SearchType, query: string): MACompListContent {
    switch (type) {
      case 'MA': // MA name
        return this.filterByMA(query)

      case 'pref':
        return this.filterByPref(query)

      case 'city':
        return this.filterByCity(query)

      case 'code': // areacode complete digit
        return this.filterByExactAreacode(query)

      case 'code_prefix': // areacode start digit
        return this.filterByPrefixAreacode(query)

      case 'all':
        return this.all()

      case 'random':
        return this.random()
    }
  }

  public shuffle(): MACompListContent {
    this.headerInfo.subHeader += '（シャッフル）'
    this.MAComps = shuffleArray(this.MAComps)

    return this
  }
}
