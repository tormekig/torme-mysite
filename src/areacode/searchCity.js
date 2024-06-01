import { useState } from 'react';
import { Link } from "react-router-dom";

import cityList from "./data/cityList"
import { getPrefCityName, getPrefCountyCityName, getPrefCityNameKana, getPrefCountyCityNameKana } from "./data/cityList"

export default function SearchCity() {

	const [showCities, setShowCities] = useState([])
	const [inputValue, setInputValue] = useState()

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
		search(e.target.value)
	}

	const search = (value) => {

		if (value === "") {
			setShowCities([]);
			return;
		}

		const searchedCities = cityList.filter(function(city) {
			return (
				getPrefCityName(city).indexOf(value) !== -1 ||
				getPrefCountyCityName(city).indexOf(value) !== -1 ||
				getPrefCityNameKana(city).indexOf(value) !== -1 ||
				getPrefCountyCityNameKana(city).indexOf(value) !== -1
			) && city.distinct === '1';
		});

		setShowCities(searchedCities);

	}

	return (
		<div className='search-city-container'>
			<h4 className='search-city-header'>市町村検索</h4>
			<div className='search-city-content'>
				<div className='search-city-text-outer'>
					<div className='search-city-text-container'>
						<input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search" />
					</div>
				</div>
				<ul className='search-city-list'>
					{showCities.map((city, i) => {
						return (
							<li key={i}>
								<Link to={`/areacode/city/${getPrefCountyCityName(city)}`}>
									<span>{getPrefCountyCityName(city)}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	)
}
