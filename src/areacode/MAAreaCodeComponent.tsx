import { Link } from "react-router-dom";
import MAList from "./css/MAList.module.scss"
import { NumberBandInfo, NumberDesignation } from "./MAAreaCode";
import { CityInfo } from "./data/cityList";


export interface ColorStyle {
    background: {
        backgroundColor: string;
        color: string;
    };
    text: {
        color: string;
    };
}

export function AreaCode({ areaCode, colorStyle }: { areaCode: string, colorStyle?: ColorStyle }) {
	return (
		<div className={MAList.areacode}>
			<p>{areaCode}</p>
		</div>
	)
}

export function MA({ ma, className }: { ma: string, className?: any }) {
	return (
		<div className={MAList.ma}>
			<p>{ma}</p>
		</div>
	)
}

export function Pref({ pref, className }: { pref: string, className?: any }) {
	return (
		<div className={MAList.pref}>
			<p>{pref}</p>
		</div>
	)
}

export function NumberBands({ areaCode, numberBands, className }: {areaCode: string, numberBands: NumberBandInfo[], className?: any[]}) {

	function insertStr(str: string, id: number, val: string): string {
		var res = str.slice(0, id) + val + str.slice(id);
		return res;
	}

	const lis: React.JSX.Element[] = [];

	numberBands.forEach(function(numberBand, i) {
		const bandStart = insertStr(numberBand.bandStart, areaCode.length, "-")
		const bandEnd = insertStr(numberBand.bandEnd, areaCode.length, "-")

		let txt: string | React.JSX.Element = `${bandStart}`
		if (bandStart !== bandEnd) {
			txt = `${txt} ～ ${bandEnd}`;
		}
		if (numberBand.eliminateCode !== '0') {
			let elim = "（" + numberBand.eliminateCode + "を除く）"
			txt = <div>{txt}<br /><small>{elim}</small></div>
		}
		lis.push(
			<li key={i}>
				<div>{txt}</div>
			</li>
		)
	})

	return (
		<div>
			<ul className={MAList.numberBands}>{lis}</ul>
		</div>
	)

}

export function InfoTable({ maDistinct, compartmentCode, square, numberDesignations }: { maDistinct: string, compartmentCode: string, square: string, numberDesignations: NumberDesignation[] }) {

	// function NumberDesignations(numberDesignations) {

	// 	const txt = [];
	
	// 	numberDesignations.forEach(function(numberDesignation, i) {
			
	// 		let tmp = numberDesignation.start
	// 		if (numberDesignation.start !== numberDesignation.end) {
	// 			tmp += " ～ " + numberDesignation.end;
	// 		} 
	// 		txt.push(
	// 			<div key={i}>{tmp}</div>
	// 		)

	// 	})
		
	// 	return txt;
		
	// }
	
	return (
		<table>
			<tbody>
				{/* <tr>
					<td>MA独立番号</td>
					<td>{maDistinct}</td>
				</tr> */}
				<tr>
					<td>番号区画コード</td>
					<td>{compartmentCode}</td>
				</tr>
				<tr>
					<td>方形区画</td>
					<td>{square}</td>
				</tr>
				{/* <tr>
					<td>MA電気通信番号指定状況</td>
					<td>{NumberDesignations(numberDesignations)}</td>
				</tr> */}
			</tbody>
		</table>
	)
}

interface ClassifiedCities {
	[key: string]: {
		[key: string]: CityInfo[]
	}
}

export function classifyCities(cities: CityInfo[]) {

	const classifiedCities: ClassifiedCities = {}

	for (const city of cities) {

		if (!(city.pref in classifiedCities)) {
			classifiedCities[city.pref] = {}
		}

		let county = city.county.note !== "" ? `${city.county.name}${city.county.type}（${city.county.note}）` : `${city.county.name}${city.county.type}`

		if (!(county in classifiedCities[city.pref])) {
			classifiedCities[city.pref][county] = []
		}

		classifiedCities[city.pref][county].push(city)

	}
	
	return classifiedCities;

}

export function Cities({ classifiedCities, areaDisplayFull, colorStyle }: { classifiedCities: ClassifiedCities, areaDisplayFull?: boolean, colorStyle: ColorStyle }) {

	const displayCities = (pref: string, county: string) => {

		const cities: React.JSX.Element[] = [];

		classifiedCities[pref][county].forEach(function(city, i) {

			if (city.name === "") return false;

			const cityFullTxt = city.pref + city.county.name + city.county.type + city.name + city.type

			let zone = null;
			if (city.zone.name) {
				zone = <small> ({city.zone.name})</small>;
				if (!areaDisplayFull) {
					zone = <small>※</small>
				}
			}

			cities.push(
				<Link to={`/areacode/city/${cityFullTxt}`}
					className={MAList.city}
					style={colorStyle.background}
					key={i}
				>
					{city.name}{city.type}
					{zone}
				</Link>
			)

		})

		return <ul>{cities}</ul>

	}

	const displayCounties = (pref: string) => {

		const counties: React.JSX.Element[] = [];

		Object.keys(classifiedCities[pref]).forEach(function(county, i) {
			let li = null;
			if (county) {
				li = (
					<li className={MAList.cityListwithBorder} key={i}>
						<div className={MAList.countyName}>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			} else {
				li = (
					<li className={MAList.cityList} key={i}>
						<div>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			}
			counties.push(li)
		})

		return <ul className={MAList.countyList}>{counties}</ul>

	}

	const displayPref = () => {

		const prefs: React.JSX.Element[] = [];

		Object.keys(classifiedCities).forEach(function(pref, i) {
			prefs.push(
				<li className={MAList.prefList} key={i}>
					<div className={MAList.prefofCities}>
						<Link to={`/areacode/pref/${pref}`} style={colorStyle.text}>{pref}</Link>
					</div>
					{ displayCounties(pref) }
				</li>
			)
		})

		return <ul>{prefs}</ul>

	}

	return <div>{ displayPref() }</div>

}


export function CitiesSimple({ classifiedCities }: { classifiedCities: ClassifiedCities }) {

	const displayCities = (pref: string, county: string) => {

		const cities: React.JSX.Element[] = [];

		classifiedCities[pref][county].forEach(function(city, i) {

			if (city.name === "") return false;

			let zone = city.zone.name ? <small> (一部)</small> : null;

			cities.push(
				<span className={MAList.city} key={i}>
					{city.name}{city.type}
					{zone}
					{(classifiedCities[pref][county].length - 1 !== i) && (<>、</>)}
				</span>
			)

		})

		return <ul>{cities}</ul>

	}

	const displayCounties = (pref: string) => {

		const counties: React.JSX.Element[] = [];

		Object.keys(classifiedCities[pref]).forEach(function(county, i) {
			let li = null;
			if (county) {
				li = (
					<li className={MAList.cityListwithBorder} key={i}>
						<div>{county}</div>
						（{ displayCities(pref, county) }）
					</li>
				)
			} else {
				li = (
					<li className={MAList.cityList} key={i}>
						{ displayCities(pref, county) }
					</li>
				)
			}
			counties.push(li)
		})

		return <ul className={MAList.countyList}>{counties}</ul>

	}

	const displayPref = () => {

		const prefs: React.JSX.Element[] = [];

		Object.keys(classifiedCities).forEach(function(pref, i) {
			prefs.push(
				<li className={MAList.prefListSimple} key={i}>
					<div className={MAList.prefofCities}>
						<p>{pref}</p>
					</div>
					{ displayCounties(pref) }
				</li>
			)
		})

		return <ul>{prefs}</ul>

	}

	return <div>{ displayPref() }</div>
}