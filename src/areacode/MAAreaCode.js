import { cityList, getCityName, getPrefCountyCityName, getPrefCountyName } from "./data/cityList.js"
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

import './css/index.scss';
import './css/accordion.scss';
import { ScrollTop, shuffleArray } from "../utils/tools.js"
import { Code3digit, Header } from "./Top.js";

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
		cities: classifyCities(cities),
		color: MAComp.color,
	}

}

function MAAreaCodeInfo({ MAComp, isExpanded="item" }) {

	const info = generateMAAreaCodeInfo(MAComp)

	return (
		<div className={"info MAComp-" + info.color}>

			<AreaCode areaCode={info.areaCode}/>
			<NumberBands areaCode={info.areaCode} numberBands={info.numberBands} />

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

function MAAreaCodeInfos ({type, query}) {

	const [headerInfo, MAComps] = searchMAAreaCodeInfos(type, query)
	const isExpanded = (type === "random") ? "" : "item";
	console.log(isExpanded, type)
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

	return (
		<div>
			<MAAreaCodeHeader info={headerInfo} />
			<div>{MAAreaCodeInfos}</div>
		</div>
	)

}

export function searchMAAreaCodeInfos(type, query, shuffle=false) {

	let MAComps = [];
	let headerInfo = {
		mainHeaderSub: "",
		mainHeader: query,
		mainHeaderLink: "",
		subHeader: "",
	}

	switch (type) {

		case "MA" : // MA name

			headerInfo.subHeader = "MA名検索"

			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.MAName === query;
			})
			break;

		case "pref":

			headerInfo.subHeader = "都道府県名検索"

			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.pref === query;
			})
			break;

		case "city":

			headerInfo.subHeader = "市町村名検索"

			const cities = cityList.filter(function(city) {
				return getPrefCountyCityName(city) === query;
			})

			cities.forEach(function(city) {
				let MAtemp = MACompList.concat().filter((m) => {
					return convertCompCode(m) === city.compartmentCode;
				})
				MAComps = MAComps.concat(MAtemp)
			})

			headerInfo.mainHeaderSub = getPrefCountyName(cities[0]);
			headerInfo.mainHeader = getCityName(cities[0]);
			headerInfo.mainHeaderLink = "https://www.google.com/maps/place/" + query;
			break;

		case "code": // areacode start digit

			headerInfo.subHeader = "市外局番検索（完全一致）"

			query = query.slice(1, query.length)
			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.areaCode === query;
			})
			break;

		case "code_prefix": // areacode start digit

			headerInfo.subHeader = "市外局番検索（前方一致）"

			query = query.slice(1, query.length)
			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.areaCode.slice(0, query.length) === query;
			})
			break;

		case "all":

			headerInfo.mainHeader = "全て"

			MAComps = MACompList.concat();
			break;

		case "random":

			headerInfo.mainHeader = "ランダム表示"

			MAComps = shuffleArray(MACompList.concat()).slice(0, 1);
			break;

		default:
			break;

	}

	if (shuffle) {

		headerInfo.subHeader += "（シャッフル）"
		MAComps = shuffleArray(MAComps)
		
	}

	return [headerInfo, MAComps];

}

function MAAreaCodeHeader({ info }) {

	return (
		<div className="MAAreaCode-header">
			<div className="main-header">
				<div className="main-header-sub">{info.mainHeaderSub}</div>
				<div className="main-header-main">{info.mainHeader}</div>
				{info.mainHeaderLink &&
					<a className="main-header-link" href={info.mainHeaderLink} target="blank">Google Mapで見る</a>
				}
			</div>
			<div className="sub-header">{info.subHeader}</div>
		</div>
	)

}

function displayCode3digit(type, query) {

	if (type !== "code" && type !== "code_prefix") return (<></>)

	const code2 = query.charAt(1);
	return Code3digit(code2);

}

export default function MAAreaCode({ type }) {

    const {query} = useParams();

	return (
		<>
			<ScrollTop />
			<Header />
            <div className="main-content">
				<div className="MAAreaCode-container">
					<div className="code-list-middle">
						{displayCode3digit(type, query)}
					</div>
					<MAAreaCodeInfos type={type} query={query} />
				</div>
			</div>
		</>
	)

}