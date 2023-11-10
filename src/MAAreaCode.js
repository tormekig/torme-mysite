import cityList from "./data/cityList.js"
import { prefCountyCityName } from "./data/cityList.js"
import numberBandList from "./data/numberBandList.js"
import MACompList from "./data/MACompList.js"
import { AreaCode, NumberBands, Pref, MA, Cities, classifyCities, InfoTable } from "./MAAreaCodeComponent.js"

import ScrollTop from "./ScrollTop.js";

import { useParams } from "react-router-dom";


function convertCompCode(MAComp) {
	return MAComp.codeSub === "" ? MAComp.codeMain : (MAComp.codeMain + "-" + MAComp.codeSub)
}

function MAAreaCodeInfo({ compCode }) {

	const MAComp = MACompList.find((m) => convertCompCode(m) === compCode)

	const numberBands = numberBandList.filter(function(numberBand) {
		return numberBand.MA + numberBand.areaCode === MAComp.MAName + MAComp.areaCode;
	})

	const cities = cityList.filter(function(city) {
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

const displayMAAreaCodeInfos = (type, query) => {

	const MAs = searchMAAreaCodeInfos(type, query)

	const MAAreaCodeInfos = [];

	MAs.forEach(function(MA, i) {
		MAAreaCodeInfos.push(
			<MAAreaCodeInfo key={i} compCode={convertCompCode(MA)}/>
		)
	})

	return <div>{MAAreaCodeInfos}</div>

}

function searchMAAreaCodeInfos(type, query) {

	let MAs = [];

	if (type === 1) { // areaCode

		MAs = MACompList.filter(function(MAComp) {
			return MAComp.areaCode === query;
		})

	} else if (type === 2) { // MAName

		MAs = MACompList.filter(function(MAComp) {
			return MAComp.MAName === query;
		})

	} else if (type === 3) { // pref

		MAs = MACompList.filter(function(MAComp) {
			return MAComp.pref === query;
		})

	} else if (type === 4) { // city

		const cities = cityList.filter(function(city) {
			return prefCountyCityName(city) === query;
		})

		cities.forEach(function(city) {
			let MAtemp = MACompList.filter((m) => {
				return convertCompCode(m) === city.compartmentCode;
			})
			MAs = MAs.concat(MAtemp)
		})

	} else if (type === 5) { // areacode first digit

		MAs = MACompList.filter(function(MAComp) {
			return MAComp.areaCode.slice(0, 1) === query;
		})

	} else if (type === 100) {

		MAs = MACompList.concat();

	}

	return MAs;

}

export default function MAAreaCode({ type }) {

    const {query} = useParams();

	return (
		<>
			<ScrollTop />
			<div>{ displayMAAreaCodeInfos(type, query) }</div>
			{/* <div>{ displayMAAreaCodeInfos(1, "3") }</div>
			<div>{ displayMAAreaCodeInfos(2, "相模原") }</div>
			<div>{ displayMAAreaCodeInfos(3, "北海道") }</div>
			<div>{ displayMAAreaCodeInfos(4, "北海道岩見沢市") }</div>
			<div>{ displayMAAreaCodeInfos(100) }</div> */}
		</>
	)

}