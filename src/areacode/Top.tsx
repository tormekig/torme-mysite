import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import SearchCity from "areacode/searchCity"

import areacode from "areacode/css/areacode.module.scss";

import prefList from "areacode/data/prefList";
import appendixList from "areacode/data/appendixList";
import { ScrollTop } from "utils/tools";
import codeColors from "areacode/data/codeColor";
import { ColorStyle } from 'areacode/MAAreaCodeComponent';

export function SearchPushNumber() {

    const navigate = useNavigate();

	const [inputValue, setInputValue] = useState([""])
    const [isError, setIsError] = useState(false);
    const pattern = new RegExp(/^0\d{1,4}$/);

	const handleInputChange = (e: any) => {
		setInputValue(e.target.value);
        if (!pattern.test(e.target.value))
            setIsError(true);
        else setIsError(false);
	}

    const startSearchMatch = () => {
        if (isError) return false;
        navigate(`/areacode/code/${inputValue}`)
    }

    const startSearchPrefix = () => {
        if (isError) return false;
        navigate(`/areacode/code/prefix/${inputValue}`)
    }

    return (
        <div>
            <h4>
                市外局番検索
                {isError ? <small>市外局番の形式を満たしていません</small> : <></>}
            </h4>
			<div className={areacode.searchPushNumberContent}>
                <ul className={areacode.searchPushNumberExecContainer}>
                    <li className={areacode.searchPushNumberTextContainer}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="045"
                        />
                    </li>
                    <li className={areacode.searchPushNumberMatchButton}>
                        <div onClick={startSearchMatch}>
                            <span>完全一致検索</span>
                        </div>
                    </li>
                    <li className={areacode.searchPushNumberPrefixButton}>
                        <div onClick={startSearchPrefix}>
                            <span>前方一致検索</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export function Code2digit() {

    const codes = [];

    for (let i = 1; i <= 9; i++) {

        const colorStyle = getColorStyle(i * 10 + 5);

        codes.push(
            <li key={i}>
                <Link
                    to={`/areacode/code/prefix/0${i}`}
                    // className={areacode[`code-list-${first}`]}
                    style={colorStyle.background}
                >
                    0{i}
                </Link>
            </li>
        )

    }

    return (
        <div className={areacode.codeListContainer}>
            <ul className={areacode.codeList}>
                {codes}
            </ul>
        </div>
    )
}

function calcColor(digit2: number) {
    const startHue = 360 / 88 * 60, inc = -1;
    const hue = startHue / 88 * inc * digit2 + startHue;
    return `hsl(${hue}, 48%, 55%)`
}

function getColorStyle(digit2: number) {

	const color = calcColor(digit2);

	return {
		background: {
			backgroundColor: color,
			color: "#fff",
		},
		text: {
			color: color
		}
	}
}

export function getColorStyleByAreaCode(areaCode: string): ColorStyle {
	const digit2 = 
		areaCode.length === 2 ?
		Number(areaCode.charAt(1)) * 10:
		Number(areaCode.charAt(1)) * 10 + +areaCode[2];

    return getColorStyle(digit2);
}

export function Code3digit(code2: number) {

    const codes: React.JSX.Element[] = [];

    if (!codeColors[code2-1]) return (<></>);

    codeColors[code2-1].forEach(function(elem, i) {

        const digit2 = (code2) * 10 + i;
        const colorStyle = getColorStyle(digit2);

        codes.push(
            <li key={i}>
                <Link
                    to={`/areacode/code/prefix/${elem.code}`}
                    // className={areacode[`code-list-${i}`]}
                    style={colorStyle.background}
                >
                    {elem.code}
                </Link>
            </li>
        )

    })

    return (
        <div className={areacode.codeListContainer}>
            <ul className={areacode.codeList}>
                {codes}
            </ul>
        </div>
    )
}

export function AllCode3digit({ closeFunc }: { closeFunc?: () => void }) {

    const codeLists = [];

    for (let i = 1; i <= 9; i++) {
        codeLists.push(
            <li key={i} onClick={closeFunc}>  
                {Code3digit(i)}
            </li>
        )

    }

    return (
        <ul className={areacode.allCodeListContainer}> 
            {codeLists}
        </ul>
    )
}

export function PrefList({ closeFunc }: { closeFunc?: () => void }) {

    const prefs: React.JSX.Element[] = [];

    prefList.forEach(function(pref, i) {

        prefs.push(
            <li key={i}>
                <Link to={`/areacode/pref/${pref.name}`} onClick={closeFunc}>
                    <span>{pref.name}</span>
                </Link>
            </li>
        )

    })

    return (
        <div className={areacode.prefAllListContainer}>
            <ul className={areacode.prefAllList}>
                {prefs}
            </ul>
        </div>
    )

}

function Appendix() {

    const appendixes: React.JSX.Element[] = []

    appendixList.forEach(function(appendix, i) {

        appendixes.push(
            <li key={i}>
                <a href={appendix.url}>{appendix.title}</a>{appendix.note}
            </li>
        )

    })

    return (
        <div className={areacode.appendix}>
            <h3>参考資料</h3>
            <ul>{appendixes}</ul>
        </div>
    )

}

export function Header() {
    return (
        <div className={areacode.headerContainer}>
            <div className={areacode.headerContent}>
                <div className={areacode.headerLeft}>
                    <Link to={`/areacode`} className={areacode.linkTitle}>市外局番手帳</Link>
                    <Link to={`/areacode/quiz`} className={areacode.linkQuiz}>クイズ</Link>
                    <Link to={`/areacode/random`} className={areacode.linkRandom}>ランダム</Link>
                </div>
                <div>
                    <Code2digit />
                </div>
            </div>
        </div>
    )
}

const Top = () => {

    return (
        <div className={areacode.areacodeBody}>
            <ScrollTop />
            <Header />
            <div className={areacode.mainContent}>
				<div className={areacode.maAreaCodeContainer}>
                    <div className={areacode.searchBox}>
                        <SearchPushNumber />
                    </div>
                    <AllCode3digit />
                    <SearchCity />
                    <PrefList />
                    <Appendix />
                    <div className={areacode.copyrightContainer}>
                        <p>Copyright 2023 torme_kig All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Top;