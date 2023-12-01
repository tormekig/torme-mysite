import { Link } from "react-router-dom";

import SearchCity from "./searchCity.js"

import prefList from "./data/prefList";
import appendixList from "./data/appendixList";
import { ScrollTop } from "./utils/tools.js";
import codeColors from "./data/codeColor.js";

export function Code2digit() {

    const codes = [];

    for (let i = 1; i <= 9; i++) {

        let first = (codeColors[i-1][0].color !== "none") ? codeColors[i-1][0].color : codeColors[i-1][1].color
        codes.push(
            <li key={i}>
                <Link to={`/code/0${i}`} className={`code-list-${first}`}>0{i}</Link>
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
                    to={`/code/${elem.code}`}
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
                <Link to={`/pref/${pref.name}`}>
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
                <Link to={`/`} className="link-title">市外局番手帳</Link>
                <Code2digit />
                <Link to={`/quiz`} className="link-quiz">クイズ</Link>
                <Link to={`/random`} className="link-random">ランダム</Link>
            </div>
        </div>
    )
}

const Top = () => {

    return (
        <div>
            <ScrollTop />
            <Header />
            <AllCode3digit />
            <SearchCity />
            <Pref />
            <Appendix />
            <div className="copyright-container">
                <p>Copyright 2023 torme_kig All rights reserved.</p>
            </div>
        </div>
    )
};

export default Top;