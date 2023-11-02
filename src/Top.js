import { Link } from "react-router-dom";

import Pref from "./Pref";

const Top = () => {

    const prefs = [];

    Pref.forEach(function(pref, i) {

        prefs.push(
            <li>
                <Link to={`/pref/${pref}`} key={i}>
                    <span>
                        {pref}
                    </span>
                </Link>
            </li>
        )

    })

    return (
        <div>
            <h1>市外局番データベース（仮）</h1>
            <p>めっちゃ質素です</p>
            <ul>{prefs}</ul>
            <div className="appendix">
                <h3>参考資料</h3>
                <ul>
                    <li>
                        <a href="https://www.soumu.go.jp/main_sosiki/joho_tsusin/top/tel_number/shigai_list.html">総務省｜電気通信番号制度｜市外局番の一覧</a>
                    </li>
                    <li>
                        <a href="https://www.ntt-east.co.jp/info-st/mutial/suburbs/numlist/">単位料金区域別市外局番等一覧表（最新情報） | 公開情報 | 企業情報 | NTT東日本</a>
                    </li>
                    <li>
                        <a href="https://www.ntt-west.co.jp/open/tani_ryoukin_0509/areapay2.html">ＮＴＴ西日本｜公開情報＞単位料金区域別市外局番等一覧表（05X～09X）</a>
                    </li>
                    <li>
                        <a href="https://www.ntt-east.co.jp/tariff/">契約約款集 | 公開情報 | 企業情報 | NTT東日本</a>内、単位料金区域(MA)一覧表
                    </li>
                    <li>
                        <a href="https://www.soumu.go.jp/main_sosiki/joho_tsusin/top/tel_number/number_shitei.html">総務省｜電気通信番号制度｜電気通信番号指定状況　（電気通信番号計画（令和元年総務省告示第6号）第1第4項による公表）</a>
                    </li>
                    <li>
                        <a href="https://store.chirijin.com/items/23922644">【現実】市外局番地図ポスター（地理人 作） | 空想地図STORE ─空想地図と地図グッズ─</a>
                    </li>
                    <li>
                        <a href="https://www.e-stat.go.jp/municipalities/cities/areacode">市区町村を探す | 政府統計の総合窓口</a>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Top;