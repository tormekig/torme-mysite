import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import areacode from '../assets/css/areacode.module.scss'

import cityList, { CityInfo } from '../data/cityList'
import {
  getPrefCityNameType,
  getPrefCountyCityNameType,
  getPrefCityNameTypeKana,
  getPrefCountyCityNameTypeKana,
} from '../data/cityList'

export function SearchCity({ closeFunc }: { closeFunc?: () => void }) {
  const cities: CityInfo[] = []

  const [showCities, setShowCities] = useState(cities)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    search(e.target.value)
  }

  const search = (value: string) => {
    if (value === '') {
      setShowCities([])
      return
    }

    const searchedCities = cityList.filter(function (city) {
      return (
        (getPrefCityNameType(city).indexOf(value) !== -1 ||
          getPrefCountyCityNameType(city).indexOf(value) !== -1 ||
          getPrefCityNameTypeKana(city).indexOf(value) !== -1 ||
          getPrefCountyCityNameTypeKana(city).indexOf(value) !== -1) &&
        city.distinct === '1'
      )
    })

    setShowCities(searchedCities)
  }

  return (
    <div className={areacode.searchCityContainer}>
      <h4 className={areacode.searchCityHeader}>市町村検索</h4>
      <div className={areacode.searchCityContent}>
        <div className={areacode.searchCityTextOuter}>
          <div className={areacode.searchCityTextContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search"
            />
          </div>
        </div>
        <ul className={areacode.searchCityList}>
          {showCities.map((city, i) => {
            return (
              <li key={i}>
                <Link
                  to={`/areacode/city/${getPrefCountyCityNameType(city)}`}
                  onClick={closeFunc}
                >
                  <span>{getPrefCountyCityNameType(city)}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
