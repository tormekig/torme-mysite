import { useState } from "react";
import { useNavigate } from "react-router-dom";
import areacode from "areacode/assets/css/areacode.module.scss";

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