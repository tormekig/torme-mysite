import { cityList, getPrefCountyCityName } from "./data/cityList.js"
import numberBandList from "./data/numberBandList.js"
import MACompList from "./data/MACompList.js"
import { AreaCode, NumberBands, Pref, MA, Cities, classifyCities, InfoTable } from "./MAAreaCodeComponent.js"

import { useParams } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import './css/accordion.scss';
import { ScrollTop, shuffleArray } from "./utils/tools.js"

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

export function generateMAAreaCodeInfo(MAComp) {

	const numberBands = getNumberBandsfromMAComp(MAComp)
	const cities = getCitiesfromMAComp(MAComp)

	return {
		areaCode: "0" + MAComp.areaCode,
		ma: MAComp.MAName,
		maDistinct: MAComp.MAnum,
		compartmentCode: convertCompCode(MAComp),
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
		cities: classifyCities(cities)
	}

}

function MAAreaCodeInfo({ MAComp, isExpanded="item" }) {

	const info = generateMAAreaCodeInfo(MAComp)

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
							<Cities classifiedCities={info.cities} />
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

const displayMAAreaCodeInfos = (type, query) => {

	const MAComps = searchMAAreaCodeInfos(type, query)
	const isExpanded = (type === "random") ? "" : "item";

	const MAAreaCodeInfos = [];

	MAComps.forEach(function(MAComp, i) {
		MAAreaCodeInfos.push(
			<MAAreaCodeInfo
				key={i}
				MAComp={MAComp}
				isExpanded={isExpanded}
			/>
		)
	})

	return <div>{MAAreaCodeInfos}</div>

}

export function searchMAAreaCodeInfos(type, query, shuffle=false) {

	let MAComps = [];

	switch (type) {

		case "MA" : // MA name

			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.MAName === query;
			})
			break;

		case "pref":

			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.pref === query;
			})
			break;

		case "city":

			const cities = cityList.filter(function(city) {
				return getPrefCountyCityName(city) === query;
			})

			cities.forEach(function(city) {
				let MAtemp = MACompList.concat().filter((m) => {
					return convertCompCode(m) === city.compartmentCode;
				})
				MAComps = MAComps.concat(MAtemp)
			})
			break;

		case "code": // areacode start digit

			query = query.slice(1, query.length)
			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.areaCode.slice(0, query.length) === query;
			})
			break;

		case "all":

			MAComps = MACompList.concat();
			break;

		case "random":

			MAComps = shuffleArray(MACompList.concat()).slice(0, 1);
			break;

	}

	if (shuffle) {

		MAComps = shuffleArray(MAComps)
		
	}

	return MAComps;

}

function MAAreaCodeHeader({ type, query }) {

	let mainHeader = query, subHeader;

	switch (type) {

		case "MA" : // MA name
			subHeader = "MA名検索"
			break;

		case "pref":
			subHeader = "都道府県名検索"
			break;

		case "city":
			subHeader = "市町村名検索"
			break;

		case "code": // areacode start digit
			subHeader = "市外局番検索（前方一致）"
			break;

		case "all":
			mainHeader = "全て"
			break;

		case "random":
			mainHeader = "ランダム表示"
			break;

	}

	return (
		<div className="MAAreaCode-header">
			<div className="main-header">{mainHeader}</div>
			<div className="sub-header">{subHeader}</div>
		</div>
	)

}

export default function MAAreaCode({ type }) {

    const {query} = useParams();

	return (
		<>
			<ScrollTop />
			<MAAreaCodeHeader type={type} query={query} />
			<div>{ displayMAAreaCodeInfos(type, query) }</div>
		</>
	)

}