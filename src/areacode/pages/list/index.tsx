import React from 'react';
import { cityList } from "areacode/data/cityList"
import numberBandList from "areacode/data/numberBandList"
import { classifyCities, ClassifiedCities } from "../detail/City";

import { useParams, useSearchParams } from "react-router-dom";

import MAList from "areacode/assets/css/MAList.module.scss";
import 'areacode/assets/css/accordion.scss';
import 'areacode/assets/css/searchModal.scss';
import { ScrollTop } from "utils/tools"
import { AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { useState } from "react";
import { MACompListContent, SearchType } from "./MACompListContent";
import { MACompInfo } from "areacode/data/MACompList";
import { Code3digit, Header, SearchModal, SearchPushNumber } from "../../components";
import { MAAreaCodeHeader } from "./header";
import { MAAreaCodeInfoCards, MAAreaCodeInfoTable } from "./components";

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
	cities: ClassifiedCities,
	color: string,
}

export function generateMAAreaCodeInfo(MAComp: MACompInfo): MAAreaCodeInfo {

	return {
		areaCode: "0" + MAComp.areaCode,
		ma: MAComp.MAName,
		maDistinct: MAComp.MAnum,
		compartmentCode: convertCompCode(MAComp),
		pref: MAComp.pref,
		square: MAComp.square,
		numberBands: getNumberBandsfromMAComp(MAComp),
		numberDesignations: [
			{
				start: "None",
				end: "None",
				note: []
			},
		],
		cities: classifyCities(getCitiesfromMAComp(MAComp)),
		color: MAComp.color,
	}

}

function MAAreaCodeInfoComponents ({type, query, style}: {type: SearchType, query: string, style: string}) {

    const [displayParam, setDisplayParam] = useState([
		"市外局番",
		"番号領域",
		"都道府県",
		"MA名",
		"市区町村"
	]);

	const {headerInfo, MAComps} = new MACompListContent().filter(type, query)
	const isExpanded = (type === "random") ? "" : "item";
	let MAAreaCodeInfos: React.JSX.Element; 

	if (style === "card") {
		MAAreaCodeInfos = <MAAreaCodeInfoCards MAComps={MAComps} isExpanded={isExpanded} />
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


export default function MAAreaCodeList({ type }: { type: SearchType }) {

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
            <div>
				<div className={MAList.maAreaCodeContainer}>
					<SearchBox openFunc={openModal} />
					<Modal
						isOpen={modalIsOpen}
						style={customStyles}
						closeTimeoutMS={200}
					>
						<SearchModal closeFunc={closeModal} />
					</Modal>
					<MAAreaCodeInfoComponents type={type} query={query} style={style} />
					<div className={MAList.codeListMiddle}>
						{displayCode3digit(type, query)}
					</div>
				</div>
			</div>
		</div>
	)

}