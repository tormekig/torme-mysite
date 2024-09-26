import React from 'react';
import MAList from "areacode/assets/css/MAList.module.scss";

export class HeaderInfo {
	public mainHeaderSub: string = "";
	public mainHeader: string = "";
	public mainHeaderRuby: string = "";
	public mainHeaderLink: string = "";
	public subHeader: string = "";

	constructor(query?: string) {
		return this.init(query);
	}

	public init(query?: string) {
		this.mainHeaderSub = "";
		this.mainHeader = query ? query : "";
		this.mainHeaderRuby = "";
		this.mainHeaderLink = "";
		this.subHeader = "";
		return this;
	}
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

function CheckBtnItems (props: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, displayParam: string[] }) {
	
	const ts: React.JSX.Element[] = items.map((item) => {
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

	return <div>{ts}</div>;
	
}

export function MAAreaCodeHeader({ info, displayParam, setDisplayParam }: { info: HeaderInfo, displayParam: string[], setDisplayParam: React.Dispatch<React.SetStateAction<string[]>>}) {

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (displayParam.includes(e.target.value)) {
			setDisplayParam(
				displayParam.filter((checkedValue) => checkedValue !== e.target.value)
			);
		} else {
			setDisplayParam([...displayParam, e.target.value]);
		}
	};

	return (
		<div className={MAList.maAreaCodeHeader}>
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