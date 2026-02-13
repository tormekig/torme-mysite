import React, { useMemo } from 'react'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAAreaCodeInfoCards } from 'areacode/pages/list/components'
import type { CityInfo } from 'areacode/data/cityList'
import type { ActiveMAInfo } from '../types'

const mapCardDisplayParam = [
  '市外局番',
  '番号領域',
  '都道府県',
  'MA名',
  '市区町村',
  '一部地域詳細表示',
]

const mapCardCityOptions = {
  areaDisplayFull: true,
  isQuiz: false,
}

function toPrefCountyCityName(city: CityInfo): string {
  return `${city.pref}${city.county.name}${city.county.type}${city.name}${city.type}`
}

export function ActiveMAPanel({
  activeMAs,
  isExpanded,
  onToggleExpand,
  prefOptions,
  cityOptions,
  digits3Options,
  selectedPref,
  selectedCity,
  selectedDigits3,
  onPrefSelect,
  onCitySelect,
  onDigits3Select,
}: {
  activeMAs: ActiveMAInfo[]
  isExpanded: boolean
  onToggleExpand: () => void
  prefOptions: string[]
  cityOptions: CityInfo[]
  digits3Options: string[]
  selectedPref: string
  selectedCity: string
  selectedDigits3: string
  onPrefSelect: (pref: string) => void
  onCitySelect: (city: string) => void
  onDigits3Select: (digits3: string) => void
}) {
  const uniqueMAKeys = useMemo(
    () => [
      ...new Set(
        activeMAs.map(
          (activeMA) =>
            `${activeMA.properties['_市外局番']}|${activeMA.properties['_MA名']}`,
        ),
      ),
    ],
    [activeMAs],
  )

  const MAComps = useMemo(
    () =>
      uniqueMAKeys.flatMap((key) => {
        const [areaCode, maName] = key.split('|')
        return new MACompListContent()
          .filter('code', `0${areaCode}`)
          .MAComps.filter((maComp) => maComp.MAName === maName)
      }),
    [uniqueMAKeys],
  )

  const uniqueMAComps = useMemo(
    () =>
      MAComps.filter(
        (maComp, index, self) =>
          self.findIndex(
            (item) =>
              `${item.pref}|${item.MAName}|${item.areaCode}` ===
              `${maComp.pref}|${maComp.MAName}|${maComp.areaCode}`,
          ) === index,
      ),
    [MAComps],
  )

  return (
    <div className={`active-ma-panel ${isExpanded ? 'expanded' : ''}`}>
      <div className="active-ma-panel-header">
        <button
          type="button"
          className="active-ma-panel-toggle"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '情報パネルを縮小' : '情報パネルを拡大'}
        >
          <div className="active-ma-panel-grabber" />
        </button>
      </div>

      <div className="map-search-panel">
        <h3 className="map-search-panel-title">検索</h3>
        <label className="map-search-panel-label">
          都道府県
          <select
            value={selectedPref}
            onChange={(event) => onPrefSelect(event.target.value)}
          >
            <option value="">選択してください</option>
            {prefOptions.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>

        <label className="map-search-panel-label">
          市町村
          <select
            value={selectedCity}
            onChange={(event) => onCitySelect(event.target.value)}
          >
            <option value="">選択してください</option>
            {cityOptions.map((city) => {
              const value = toPrefCountyCityName(city)
              return (
                <option key={`${city.pref}-${city.code}`} value={value}>
                  {value}
                </option>
              )
            })}
          </select>
        </label>

        <label className="map-search-panel-label">
          3桁番号
          <select
            value={selectedDigits3}
            onChange={(event) => onDigits3Select(event.target.value)}
          >
            <option value="">選択してください</option>
            {digits3Options.map((digits3) => (
              <option key={digits3} value={digits3}>
                {digits3}
              </option>
            ))}
          </select>
        </label>
      </div>

      {uniqueMAComps.length > 0 && (
        <MAAreaCodeInfoCards
          MAComps={uniqueMAComps}
          displayParam={mapCardDisplayParam}
          cityOptions={mapCardCityOptions}
        />
      )}
    </div>
  )
}
