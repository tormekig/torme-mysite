import { Link } from "react-router-dom";

import SearchCity from "./searchCity.js"

import prefList from "./data/prefList";
import appendixList from "./data/appendixList";
import { ScrollTop } from "./utils/tools.js";

function Code() {

    const codes = [];

    for (let i = 1; i <= 9; i++) {

        codes.push(
            <li key={i}>
                <Link to={`/code/0${i}`}>
                    <span>{i}</span>
                </Link>
            </li>
        )

    }

    return codes;
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

    return prefs;

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

    return appendixes;

}

const Top = () => {

    return (
        <div>
            <ScrollTop />
            <h1>市外局番データベース（仮）</h1>
            <p>めっちゃ質素です</p>
            <Link to={`/quiz`}>
                <span>クイズ</span>
            </Link>
            <SearchCity />
            <ul><Code /></ul>
            <ul><Pref /></ul>
            <div className="appendix">
                <h3>参考資料</h3>
                <ul><Appendix /></ul>
            </div>
            <small>Copyright 2023 torme_kig All rights reserved.</small>
        </div>
    )
};

export default Top;