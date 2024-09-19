import { cityList } from "./data/cityList.js"
import numberBandList from "./data/numberBandList.js"
import { AreaCode, NumberBands, Pref, MA, Cities, classifyCities, InfoTable } from "./MAAreaCodeComponent.jsx"

import { useParams, useSearchParams } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import MAList from "areacode/css/MAList.module.scss";
import './css/accordion.scss';
import './css/searchModal.scss';
import { ScrollTop } from "../utils/tools.js"
import { Code3digit, Header, AllCode3digit, PrefList, SearchPushNumber, getColorStyleByAreaCode } from "areacode/Top";
import { AnimatePresence, motion } from "framer-motion";
import { HeaderInfo, searchMAAreaCodeInfos } from "areacode/searchMAAreaCodeInfo";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SearchCity from "areacode/searchCity";
import Modal from "react-modal";
import { useState } from "react";
import { SearchType } from "./searchMAAreaCodeInfo.jsx";
import { MACompInfo } from "./data/MACompList.jsx";

export function convertCompCode(MAComp: MACompInfo) {
	return MAComp.codeSub === "" ? MAComp.codeMain : (MAComp.codeMain + "-" + MAComp.codeSub)
}

export function getNumberBandsfromMAComp(MAComp: MACompInfo) {

	return numberBandList.filter(function(numberBand) {
		return numberBand.MA + numberBand.areaCode === MAComp.MAName + MAComp.areaCode;
	})

}

function getCitiesfromMAComp(MAComp: MACompInfo) {

	return cityList.filter(function(city) {
		return city.compartmentCode === convertCompCode(MAComp);
	})

}

export interface NumberBandInfo {
    id: string;
    MA: string;
    areaCode: string;
    bandStart: string;
    bandEnd: string;
    eliminateCode: string;
}

export interface NumberDesignation {
    start: string;
    end: string;
    note: [];
}

interface MAAreaCodeInfo {
	areaCode: string,
	ma: string,
	maDistinct: string,
	compartmentCode: string,
	pref: string,
	square: string,
	numberBands: NumberBandInfo[],
	numberDesignations: NumberDesignation[],
	cities: any, // TODO
	color: string,
}

export function generateMAAreaCodeInfo(MAComp: MACompInfo): MAAreaCodeInfo {

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

function MAAreaCodeInfoBlock({ MAComp, isExpanded="item" }: { MAComp: MACompInfo, isExpanded: string}) {

	const info = generateMAAreaCodeInfo(MAComp)
	const colorStyle = getColorStyleByAreaCode(info.areaCode)

	return (
		<div className={`${MAList.infoBlock}`}>
			<div className={`${MAList["MAComp-" + info.color]}`}>

				<AreaCode areaCode={info.areaCode} colorStyle={colorStyle} />
				<NumberBands areaCode={info.areaCode} numberBands={info.numberBands} />

				<Accordion allowZeroExpanded preExpanded={[isExpanded]}>

					<AccordionItem uuid="item">

						<AccordionItemHeading>
							<AccordionItemButton>
								詳細
							</AccordionItemButton>
						</AccordionItemHeading>

						<AccordionItemPanel>

							<div className={MAList.MApref}>
								<Pref pref={info.pref} />
								<MA ma={info.ma} />
							</div>

							<div className={MAList.citiesContainer}>
								<Cities classifiedCities={info.cities} colorStyle={colorStyle} />
							</div>

							<div className={MAList.infoTableContainer}>
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

		</div>
	)

}

function MAAreaCodeInfoTable({ MAComps, displayParam }: { MAComps: MACompInfo[], displayParam: string[] }) {
	
	function MAAreaCodeInfoRow({ MAComp, custom }: { MAComp: MACompInfo, custom: number }) {
	
		const info = generateMAAreaCodeInfo(MAComp);
		const colorStyle = getColorStyleByAreaCode(info.areaCode)
	
		return (
			<motion.tr
				className={`${MAList.infoRow} ${MAList["MAComp-" + info.color]}`}
			>
	
				{displayParam.includes("市外局番") && 
				<td style={colorStyle.background}>
					<AreaCode areaCode={info.areaCode}/>
				</td>
				}
	
				{displayParam.includes("番号領域") && 
				<td>
					<NumberBands areaCode={info.areaCode} numberBands={info.numberBands} />
				</td>
				}
	
				{displayParam.includes("都道府県") && 
				<td>
					<Pref pref={info.pref} className={MAList.pref} />
				</td>
				}
	
				{displayParam.includes("MA名") && 
				<td>
					<MA ma={info.ma} className={MAList.MA} />
				</td>
				}
	
				{displayParam.includes("市区町村") && 
				<td className={MAList.citiesContainerTd}>
					<Cities
						classifiedCities={info.cities}
						areaDisplayFull={displayParam.includes("一部地域詳細表示")}
						colorStyle={colorStyle}
					/>
				</td>
				}
	
				{displayParam.includes("MA独立番号") && 
				<td>
					<div className={MAList.additionalInfo}>
						<p>{info.maDistinct}</p>
					</div>
				</td>
				}
	
				{displayParam.includes("番号区画コード") && 
				<td>
					<div className={MAList.additionalInfo}>
						<p>{info.compartmentCode}</p>
					</div>
				</td>
				}

				{displayParam.includes("方形区画") && 
				<td>
					<div className={MAList.additionalInfo}>
						<p>{info.square}</p>
					</div>
				</td>
				}
	
			</motion.tr>
		)
	
	}
	
	return (
		<table className={MAList.infoTable}>
			<thead>
				<tr>
					{displayParam.includes("市外局番") && (<th>市外局番</th>)}
					{displayParam.includes("番号領域") && (<th>番号領域</th>)}
					{displayParam.includes("都道府県") && (<th>都道府県</th>)}
					{displayParam.includes("MA名") && (<th>MA名</th>)}
					{displayParam.includes("市区町村") && (<th>市区町村</th>)}
					{displayParam.includes("MA独立番号") && (<th>MA<br/>独立番号</th>)}
					{displayParam.includes("番号区画コード") && (<th>番号区画<br/>コード</th>)}
					{displayParam.includes("方形区画") && (<th>方形区画</th>)}
				</tr>
			</thead>
			<tbody>
			{MAComps.map((MAComp, i) => {
				return (
					<MAAreaCodeInfoRow
						key={i}
						custom={i}
						MAComp={MAComp}
					/>
				)
			})}
			</tbody>
		</table>
	)
}

function MAAreaCodeInfos ({type, query, style}: {type: SearchType, query: string, style: string}) {

    const [displayParam, setDisplayParam] = useState([
		"市外局番",
		"番号領域",
		"都道府県",
		"MA名",
		"市区町村"
	]);

	const {headerInfo, MAComps} = searchMAAreaCodeInfos(type, query)
	const isExpanded = (type === "random") ? "" : "item";
	let MAAreaCodeInfos: any = []; // TODO: fix any

	if (style === "card") {
		MAComps.forEach(function(MAComp, i) {
			MAAreaCodeInfos.push(
				<MAAreaCodeInfoBlock
					key={i}
					MAComp={MAComp}
					isExpanded={isExpanded}
				/>
			)
		})
	} else {
		MAAreaCodeInfos = <MAAreaCodeInfoTable MAComps={MAComps} displayParam={displayParam} />
	}

	return (
		<div>
			<MAAreaCodeHeader info={headerInfo} displayParam={displayParam} setDisplayParam={setDisplayParam} />
			<AnimatePresence mode="wait">
				<div key="content">
					{MAAreaCodeInfos}
				</div>
			</AnimatePresence>
		</div>
	)

}

function displayCode3digit(type: SearchType, query: string) {

	if (type !== "code" && type !== "code_prefix") return (<></>)

	const code2 = query.charAt(1);
	return Code3digit(Number(code2));

}

const items = [
	"市外局番",
	"番号領域",
	"都道府県",
	"MA名",
	"市区町村",
	"一部地域詳細表示",
	"MA独立番号",
	"番号区画コード",
	"方形区画",
];

const CheckBtnItems = (props: { handleChange: (e: any) => void, displayParam: string[] }) => 
	items.map((item) => {
		return (
			<label key={item}>
				<input
					type="checkbox"
					value={item}
					onChange={props.handleChange}
					checked={props.displayParam.includes(item)}
				/>
				{item}
			</label>
		);
	});

function MAAreaCodeHeader({ info, displayParam, setDisplayParam }: { info: HeaderInfo, displayParam: string[], setDisplayParam: React.Dispatch<React.SetStateAction<string[]>>}) {

	
	const handleChange = (e: any) => {
		if (displayParam.includes(e.target.value)) {
			setDisplayParam(
				displayParam.filter((checkedValue) => checkedValue !== e.target.value)
			);
		} else {
			setDisplayParam([...displayParam, e.target.value]);
		}
	};

	return (
		<div className={MAList.MAAreaCodeHeader}>
			<div>
				<div className={MAList.mainHeader}>
					<div className={MAList.mainHeaderSub}>{info.mainHeaderSub}</div>
					<div className={MAList.mainHeaderMain}>{info.mainHeader}</div>
					{info.mainHeaderRuby && 
						<div className={MAList.mainHeaderRuby}>{info.mainHeaderRuby}</div>
					}
					{info.mainHeaderLink &&
						<a className={MAList.mainHeaderLink} href={info.mainHeaderLink} target="blank">Google Mapで見る</a>
					}
				</div>
				<div className={MAList.subHeader}>{info.subHeader}</div>
			</div>

			<div className={MAList.checkBtnContainer}>
				<CheckBtnItems
					handleChange={handleChange}
					displayParam={displayParam}
				/>
			</div>
		</div>
	)

}

function SearchBox({ openFunc }: { openFunc: () => void }) {
	return (
		<div className={MAList.searchBox}>
			<SearchPushNumber />
			<div className={MAList.openSearchDetailContainer}>
				<div className={MAList.openSearchDetail} onClick={() => {openFunc();}}>
					<span>その他検索<br/><small>（3桁表・都道府県・市区町村）</small></span>
				</div>
			</div>
		</div>
	)
}

function SearchModal({ closeFunc }: { closeFunc: () => void }) {
	return (
		<div className={MAList.searchBoxContainer}>
			<Tabs className="searchDetailBox">
				<TabList>
					<Tab>3桁表</Tab>
					<Tab>都道府県</Tab>
					<Tab>市区町村</Tab>
				</TabList>
			
				<TabPanel>
					<AllCode3digit closeFunc={closeFunc} />
				</TabPanel>
				<TabPanel>
					<PrefList closeFunc={closeFunc} />
				</TabPanel>
				<TabPanel>
					<SearchCity closeFunc={closeFunc} />
				</TabPanel>
			</Tabs>
			<div className="modalCloseButton" onClick={() => {closeFunc();}}>
				<span>閉じる</span>
			</div>
		</div>
	)
}

export default function MAAreaCode({ type }: { type: SearchType }) {

	Modal.setAppElement('#root');

    const {query: _query} = useParams();
	const query: string = _query ? _query : ""
	
	const [searchParams] = useSearchParams();
	const _style = searchParams.get("style");
	const style = _style ? _style : "";

    const [modalIsOpen, setModalIsOpen] = useState(false);	
	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const customStyles = {
		content: {
			margin: '0 auto',
			maxWidth: '1280px',
			inset: '4rem'
		},
		overlay: {
			transition: 'opacity 200ms ease-in-out',
		},
	};

	return (
		<div id="areacodeBody" className={MAList.areacodeBody}>
			<ScrollTop />
			<Header />
            <div className={MAList.mainContent}>
				<div className={MAList.MAAreaCodeContainer}>
					<SearchBox openFunc={openModal} />
					<Modal
						isOpen={modalIsOpen}
						style={customStyles}
						closeTimeoutMS={200}
					>
						<SearchModal closeFunc={closeModal} />
					</Modal>
					<MAAreaCodeInfos type={type} query={query} style={style} />
					<div className={MAList.codeListMiddle}>
						{displayCode3digit(type, query)}
					</div>
				</div>
			</div>
		</div>
	)

}