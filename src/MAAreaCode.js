import City from "./data/city.js"
import NumberBandsList from "./data/numberBands.js"
import MAComps from "./data/MACompartments.js"
import ScrollTop from "./ScrollTop.js";

import { useParams } from "react-router-dom";


function AreaCode({ areaCode }) {
	return (
		<div className="areacode">
			<p>{areaCode}</p>
		</div>
	)
}

function MA({ ma }) {
	return (
		<div className="ma">
			<p>{ma}</p>
		</div>
	)
}

function Pref({ pref }) {
	return (
		<div className="pref">
			<p>{pref}</p>
		</div>
	)
}

function NumberBands({ numberBands }) {

	const lis = [];

	numberBands.forEach(function(numberBand, i) {
		let txt = numberBand.bandStart
		if (numberBand.bandStart !== numberBand.bandEnd) {
			txt += " ～ " + numberBand.bandEnd;
		}
		if (numberBand.eliminateCode !== '0') {
			txt += "（" + numberBand.eliminateCode + "を除く）"
		}
		lis.push(
			<li key={i}>
				<div>{txt}</div>
			</li>
		)
	})

	return (
		<div>
			<ul className="numberBands">{lis}</ul>
		</div>
	)

}

function InfoTable({ maDistinct, compartmentCode, square, numberDesignations }) {

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


function classifyCities(cities) {

	const classifiedCities = {}

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

function Cities({ classifiedCities }) {

	const displayCities = (pref, county) => {

		const cities = [];

		classifiedCities[pref][county].forEach(function(city, i) {

			if (city.name === "") return false;

			const cityFullTxt = city.pref + city.county.name + city.county.type + city.name + city.type
			const googleMapURL = "https://www.google.com/maps/place/" + cityFullTxt;

			let zone = city.zone.name ? <small> ({city.zone.name})</small> : null;

			cities.push(
				<span className="city" key={i}>
					<a href={googleMapURL} target="blank">
							{city.name}{city.type}
					</a>
					{zone}
				</span>
			)

		})

		return <ul>{cities}</ul>

	}

	const displayCounties = (pref) => {

		const counties = [];

		Object.keys(classifiedCities[pref]).forEach(function(county, i) {
			let li = null;
			if (county) {
				li = (
					<li className="cityListwithBorder" key={i}>
						<div>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			} else {
				li = (
					<li className="cityList" key={i}>
						<div>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			}
			counties.push(li)
		})

		return <ul className="countyList">{counties}</ul>

	}

	const displayPref = () => {

		const prefs = [];

		Object.keys(classifiedCities).forEach(function(pref, i) {
			prefs.push(
				<li className="prefList" key={i}>
					<div className="prefofCities">
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

function MAAreaCodeInfo({ compCodeMain }) {

	const MAComp = MAComps.find((c) => c.codeMain === compCodeMain)

	const compCode = MAComp.codeSub === "" ? MAComp.codeMain : (MAComp.codeMain + "-" + MAComp.codeSub)

	const numberBands = NumberBandsList.filter(function(numberBand) {
		return numberBand.MA + numberBand.areaCode === MAComp.MAName + MAComp.areaCode;
	})

	const cities = City.filter(function(city) {
		return city.compartmentCode === compCode;
	})

	const info = {
		areaCode: "0" + MAComp.areaCode,
		ma: MAComp.MAName,
		maDistinct: MAComp.MAnum,
		compartmentCode: compCode,
		pref: MAComp.pref,
		square: MAComp.square,
		numberBands: numberBands,
		numberDesignations: [
			{
				start: "None",
				end: "None",
				note: []
			},
		],
		cities: cities
	}

	return (
		<div className="info">

			<AreaCode areaCode={info.areaCode}/>

			<NumberBands numberBands={info.numberBands} />

			<div className="MApref">
				<Pref pref={info.pref} />
				<MA ma={info.ma} />
			</div>

			<div className="citiesContainer">
				<Cities classifiedCities={classifyCities(info.cities)} />
			</div>

			<div className="infoTableContainer">
				<InfoTable
					maDistinct={info.maDistinct}
					compartmentCode={info.compartmentCode}
					square={info.square}
					numberDesignations={info.numberDesignations}
				/>
			</div>
		</div>
	)

}

const displayMAAreaCodeInfos = (MAs) => {

	const MAAreaCodeInfos = [];

	MAs.forEach(function(MA, i) {
		MAAreaCodeInfos.push(
			<MAAreaCodeInfo key={i} compCodeMain={MA.codeMain}/>
		)
	})

	return <div>{MAAreaCodeInfos}</div>

}

function searchMAAreaCodeInfos(type, query) {

	let MAs;

	if (type === 1) { // areaCode
		MAs = MAComps.filter(function(MAComp) {
				return MAComp.areaCode === query;
		})
	} else if (type === 2) { // MAName
		MAs = MAComps.filter(function(MAComp) {
			return MAComp.MAName === query;
		})
	} else if (type === 3) { // pref
		MAs = MAComps.filter(function(MAComp) {
			return MAComp.pref === query;
		})
	} else if (type === 100) {
		MAs = MAComps.concat();
	}

	return MAs;

}

export default function MAAreaCode({ type }) {

    const {query} = useParams();

	// const MAs = searchMAAreaCodeInfos(1, "3")
	// const MAs = searchMAAreaCodeInfos(2, "相模原")
	// const MAs = searchMAAreaCodeInfos(3, "北海道")
	const MAs = searchMAAreaCodeInfos(type, query)
	// const MAs = searchMAAreaCodeInfos(100)

	return (
		<>
			<ScrollTop />
			<div>{ displayMAAreaCodeInfos(MAs) }</div>
		</>
	)

}