import cityList from "./data/cityList.js"
import { prefCountyCityName } from "./data/cityList.js"
import numberBandList from "./data/numberBandList.js"
import MACompList from "./data/MACompList.js"
import { AreaCode, NumberBands, Pref, MA, Cities, classifyCities, InfoTable } from "./MAAreaCodeComponent.js"

import ScrollTop from "./ScrollTop.js";

import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import './css/accordion.scss';
import { shuffleArray } from "./utils/tools.js"

function convertCompCode(MAComp) {
	return MAComp.codeSub === "" ? MAComp.codeMain : (MAComp.codeMain + "-" + MAComp.codeSub)
}

export function getNumberBandsfromMAComp(MAComp) {

	return numberBandList.filter(function(numberBand) {
		return numberBand.MA + numberBand.areaCode === MAComp.MAName + MAComp.areaCode;
	})

}

function getCitiesfromMAComp(MAComp) {

	return cityList.filter(function(city) {
		return city.compartmentCode === convertCompCode(MAComp);
	})

}

function MAAreaCodeInfo({ compCode, isExpanded="item" }) {

	const MAComp = MACompList.find((m) => convertCompCode(m) === compCode)

	const numberBands = getNumberBandsfromMAComp(MAComp)
	const cities = getCitiesfromMAComp(MAComp)

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

			<Accordion allowZeroExpanded preExpanded={[isExpanded]}>

				<AccordionItem uuid="item">

					<AccordionItemHeading>
						<AccordionItemButton>
							詳細
						</AccordionItemButton>
					</AccordionItemHeading>

					<AccordionItemPanel>

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

					</AccordionItemPanel>
					
				</AccordionItem>

			</Accordion>

		</div>
	)

}

const displayMAAreaCodeInfos = (type, query, shuffle) => {

	const MAComps = searchMAAreaCodeInfos(type, query, shuffle)
	const isExpanded = (shuffle) ? "" : "item";

	const MAAreaCodeInfos = [];

	MAComps.forEach(function(MAComp, i) {
		MAAreaCodeInfos.push(
			<MAAreaCodeInfo
				key={i}
				compCode={convertCompCode(MAComp)}
				isExpanded={isExpanded}
			/>
		)
	})

	return <div>{MAAreaCodeInfos}</div>

}

export function searchMAAreaCodeInfos(type, query, shuffle) {

	let MAComps = [];

	if (type === "areacode") {

		MAComps = MACompList.concat().filter(function(MAComp) {
			return MAComp.areaCode === query;
		})

	} else if (type === "MA") { // MA name

		MAComps = MACompList.concat().filter(function(MAComp) {
			return MAComp.MAName === query;
		})

	} else if (type === "pref") {

		MAComps = MACompList.concat().filter(function(MAComp) {
			return MAComp.pref === query;
		})

	} else if (type === "city") {

		const cities = cityList.filter(function(city) {
			return prefCountyCityName(city) === query;
		})

		cities.forEach(function(city) {
			let MAtemp = MACompList.concat().filter((m) => {
				return convertCompCode(m) === city.compartmentCode;
			})
			MAComps = MAComps.concat(MAtemp)
		})

	} else if (type === "code") { // areacode first digit

		MAComps = MACompList.concat().filter(function(MAComp) {
			return MAComp.areaCode.slice(0, query.length) === query;
		})

	} else if (type === "all") {

		MAComps = MACompList.concat();

	}

	if (shuffle) {

		MAComps = shuffleArray(MAComps)
		
	}

	return MAComps;

}

export default function MAAreaCode({ type }) {

    const {query} = useParams();
    const {shuffle} = useParams();

	return (
		<>
			<ScrollTop />
			<div>{ displayMAAreaCodeInfos(type, query, shuffle) }</div>
			{/* <div>{ displayMAAreaCodeInfos(1, "3") }</div>
			<div>{ displayMAAreaCodeInfos(2, "相模原") }</div>
			<div>{ displayMAAreaCodeInfos(3, "北海道") }</div>
			<div>{ displayMAAreaCodeInfos(4, "北海道岩見沢市") }</div>
			<div>{ displayMAAreaCodeInfos(100) }</div> */}
		</>
	)

}