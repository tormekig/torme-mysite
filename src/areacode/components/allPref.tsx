import React from 'react';
import areacode from "areacode/assets/css/areacode.module.scss";
import prefList from "areacode/data/prefList";
import { Link } from "react-router-dom";

export function AllPref({ closeFunc }: { closeFunc?: () => void }) {

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