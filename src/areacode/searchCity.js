import { useState } from 'react';
import { Link } from "react-router-dom";

import areacode from "./css/areacode.module.scss";

import cityList from "./data/cityList"
import { getPrefCityName, getPrefCountyCityName, getPrefCityNameKana, getPrefCountyCityNameKana } from "./data/cityList"

export default function SearchCity({ closeFunc }) {

	const [showCities, setShowCities] = useState([])
	const [inputValue, setInputValue] = useState("")

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
		<div className={areacode.searchCityContainer}>
			<h4 className={areacode.searchCityHeader}>市町村検索</h4>
			<div className={areacode.searchCityContent}>
				<div className={areacode.searchCityTextOuter}>
					<div className={areacode.searchCityTextContainer}>
						<input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search" />
					</div>
				</div>
				<ul className={areacode.searchCityList}>
					{showCities.map((city, i) => {
						return (
							<li key={i}>
								<Link to={`/areacode/city/${getPrefCountyCityName(city)}`} onClick={closeFunc}>
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
