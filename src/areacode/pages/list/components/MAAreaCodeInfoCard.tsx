import React from 'react';
import { AreaCode, Cities, InfoTable, MA, NumberBands, Pref } from "areacode/pages/detail";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import MAList from "areacode/assets/css/MAList.module.scss";
import { MACompInfo } from "areacode/data/MACompList";
import { generateMAAreaCodeInfo } from "../../list";
import { getColorStyleByAreaCode } from "areacode/components";

function MAAreaCodeInfoCard({ MAComp, isExpanded="item" }: { MAComp: MACompInfo, isExpanded: string}) {

	const info = generateMAAreaCodeInfo(MAComp)
	const colorStyle = getColorStyleByAreaCode(info.areaCode)

	return (
		<div className={`${MAList.infoBlock}`}>
			{/* <div className={`${MAList["MAComp-" + info.color]}`}> // TODO: fix  */}
			<div>

				<AreaCode areaCode={info.areaCode} colorStyle={colorStyle} />
				<NumberBands areaCode={info.areaCode} numberBands={info.numberBands} />

				<Accordion allowZeroExpanded preExpanded={[isExpanded]}>

					<AccordionItem uuid="item">

						<AccordionItemHeading>
							<AccordionItemButton>
								詳細
							</AccordionItemButton>
						</AccordionItemHeading>

						<AccordionItemPanel>

							<div className={MAList.mApref}>
								<Pref pref={info.pref} />
								<MA ma={info.ma} />
							</div>

							<div className={MAList.citiesContainer}>
								<Cities classifiedCities={info.cities} colorStyle={colorStyle} />
							</div>

							<div className={MAList.infoTableContainer}>
								<InfoTable
									compartmentCode={info.compartmentCode}
									square={info.square}
								/>
							</div>

						</AccordionItemPanel>
						
					</AccordionItem>

				</Accordion>

			</div>

		</div>
	)

}

export function MAAreaCodeInfoCards({ MAComps, isExpanded="item" }: { MAComps: MACompInfo[], isExpanded: string}) {
	const MAAreaCodeInfos: React.JSX.Element[] = [];

	MAComps.forEach(function(MAComp, i) {
		MAAreaCodeInfos.push(
			<MAAreaCodeInfoCard
				key={i}
				MAComp={MAComp}
				isExpanded={isExpanded}
			/>
		)
	})

	return <>{MAAreaCodeInfos}</>;
}