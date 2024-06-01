import { useState } from 'react';
import { Link } from "react-router-dom";

import SearchCity from "./searchCity.js"

import prefList from "./data/prefList.js";
import appendixList from "./data/appendixList.js";
import { ScrollTop } from "../utils/tools.js";
import codeColors from "./data/codeColor.js";

export function SearchPushNumber() {

	const [inputValue, setInputValue] = useState()

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

    return (
        <div className='search-push-number-container'>
            <h4 className='search-push-number-header'>市外局番検索</h4>
			<div className='search-push-number-content'>
				<div className='search-push-number-text-outer'>
					<div className='search-push-number-text-container'>
						<input type="text" value={inputValue} onChange={handleInputChange} placeholder="045" />
					</div>
				</div>
                <ul className="push-number-exec-container">
                    <Link to={`/areacode/code/${inputValue}`}>
                        <span>完全一致検索</span>
                    </Link>
                    <Link to={`/areacode/code/prefix/${inputValue}`}>
                        <span>前方一致検索</span>
                    </Link>
                </ul>
            </div>
        </div>

    )
}

export function Code2digit() {

    const codes = [];

    for (let i = 1; i <= 9; i++) {

        let first = (codeColors[i-1][0].color !== "none") ? codeColors[i-1][0].color : codeColors[i-1][1].color
        codes.push(
            <li key={i}>
                <Link to={`/areacode/code/prefix/0${i}`} className={`code-list-${first}`}>0{i}</Link>
            </li>
        )

    }

    return (
        <div className="code-list-container">
            <ul className="code-list">
                {codes}
            </ul>
        </div>
    )
}

export function Code3digit(code2) {

    const codes = [];

    codeColors[code2-1].forEach(function(elem, i) {

        codes.push(
            <li key={i}>
                <Link
                    to={`/areacode/code/prefix/${elem.code}`}
                    className={`code-list-${elem.color}`}
                >
                    {elem.code}
                </Link>
            </li>
        )

    })

    return (
        <div className="code-list-container">
            <ul className="code-list">
                {codes}
            </ul>
        </div>
    )
}

function AllCode3digit() {

    const codeLists = [];

    for (let i = 1; i <= 9; i++) {

        codeLists.push(
            <li key={i}>  
                {Code3digit(i)}
            </li>
        )

    }

    return (
        <ul className="all-code-list-container"> 
            {codeLists}
        </ul>
    )
}

function Pref() {

    const prefs = [];

    prefList.forEach(function(pref, i) {

        prefs.push(
            <li key={i}>
                <Link to={`/areacode/pref/${pref.name}`}>
                    <span>{pref.name}</span>
                </Link>
            </li>
        )

    })

    return (
        <div className="pref-all-list-container">
            <ul className="pref-all-list">
                {prefs}
            </ul>
        </div>
    )

}

function Appendix() {

    const appendixes = []

    appendixList.forEach(function(appendix, i) {

        appendixes.push(
            <li key={i}>
                <a href={appendix.url}>{appendix.title}</a>{appendix.note}
            </li>
        )

    })

    return (
        <div className="appendix">
            <h3>参考資料</h3>
            <ul>{appendixes}</ul>
        </div>
    )

}

export function Header() {
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-left">
                    <Link to={`/areacode`} className="link-title">市外局番手帳</Link>
                    <Link to={`/areacode/quiz`} className="link-quiz">クイズ</Link>
                    <Link to={`/areacode/random`} className="link-random">ランダム</Link>
                </div>
                <div className="header-right">
                    <Code2digit />
                </div>
            </div>
        </div>
    )
}

const Top = () => {

    return (
        <div>
            <ScrollTop />
            <Header />
            <div className="main-content">
                <SearchPushNumber />
                <AllCode3digit />
                <SearchCity />
                <Pref />
                <Appendix />
                <div className="copyright-container">
                    <p>Copyright 2023 torme_kig All rights reserved.</p>
                </div>
            </div>
        </div>
    )
};

export default Top;