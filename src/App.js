import City from "./data/city.js"
import MAComps from "./data/MACompartments.js"

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
		let txt = numberBand.start
		if (numberBand.start !== numberBand.end) {
			txt += " ～ " + numberBand.end;
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

	function NumberDesignations(numberDesignations) {

		const txt = [];
	
		numberDesignations.forEach(function(numberDesignation, i) {
			
			let tmp = numberDesignation.start
			if (numberDesignation.start !== numberDesignation.end) {
				tmp += " ～ " + numberDesignation.end;
			} 
			txt.push(
				<div key={i}>{tmp}</div>
			)

		})
		
		return txt;
		
	}
	
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
				<tr>
					<td>MA電気通信番号指定状況</td>
					<td>{NumberDesignations(numberDesignations)}</td>
				</tr>
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

		let county = city.county.name + city.county.type
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
			// let zone = ""
			let zone = city.zone.name ? <small> ({city.zone.name})</small> : null;

			cities.push(
				<span className="city" key={i}>
					{city.name}{city.type}{zone}
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
				<li key={i}>
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

	let MAComp

	if (MAComps.some((c) => c.codeMain === compCodeMain)) {
		MAComp = MAComps.find((c) => c.codeMain === compCodeMain)
	} else {
		return <div>Not Found</div>
	}

	const compCode = MAComp.codeSub === "" ? MAComp.codeMain : (MAComp.codeMain + "-" + MAComp.codeSub)

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
		numberBands: [
			{
				start: "0152-1",
				end: "0152-1",
				note: []
			},
			{
				start: "0152-4",
				end: "0152-6",
				note: []
			}
		],
		numberDesignations: [
			{
				start: "015240",
				end: "015269",
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
	}

	return MAs;

}

export default function App() {

	const MAs = searchMAAreaCodeInfos(1, "45")
	// const MAs = searchMAAreaCodeInfos(2, "相模原")

	return <div>{ displayMAAreaCodeInfos(MAs) }</div>

}