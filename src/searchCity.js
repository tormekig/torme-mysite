import { useState } from 'react';
import { Link } from "react-router-dom";

import cityList from "./data/cityList"
import { prefCityName, prefCountyCityName, prefCityKanaName, prefCountyCityKanaName } from "./data/cityList"

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
				prefCityName(city).indexOf(value) !== -1 ||
				prefCountyCityName(city).indexOf(value) !== -1 ||
				prefCityKanaName(city).indexOf(value) !== -1 ||
				prefCountyCityKanaName(city).indexOf(value) !== -1
			) && city.distinct === '1';
		});

		setShowCities(searchedCities);

	}

	return (
		<div>
			<h4>Search</h4>
			<input type="text" value={inputValue} onChange={handleInputChange} />
			{showCities.map((city, i) => {
				return (
					<div key={i}>
						<p>
							<Link to={`/city/${prefCountyCityName(city)}`}>
								<span>{prefCountyCityName(city)}</span>
							</Link>
						</p>
					</div>
				);
			})}
		</div>
	)
}
