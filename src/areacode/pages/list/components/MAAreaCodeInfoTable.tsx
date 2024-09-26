import React from 'react';
import { MACompInfo } from "areacode/data/MACompList";
import { generateMAAreaCodeInfo } from "../../list";
import { getColorStyleByAreaCode } from "areacode/components";
import { motion } from "framer-motion";
import MAList from "areacode/assets/css/MAList.module.scss";
import { AreaCode, Cities, MA, NumberBands, Pref } from "areacode/pages/detail";

function MAAreaCodeInfoRow({ MAComp, displayParam }: { MAComp: MACompInfo, displayParam: string[] }) {
	
	const info = generateMAAreaCodeInfo(MAComp);
	const colorStyle = getColorStyleByAreaCode(info.areaCode)

	return (
		<motion.tr
			// className={`${MAList.infoRow} ${MAList["MAComp-" + info.color]}`} // TODO: fix
			className={`${MAList.infoRow}`}
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
				<MA ma={info.ma} className={MAList.ma} />
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

export function MAAreaCodeInfoTable({ MAComps, displayParam }: { MAComps: MACompInfo[], displayParam: string[] }) {
	
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
						MAComp={MAComp}
						displayParam={displayParam}
					/>
				)
			})}
			</tbody>
		</table>
	)
}