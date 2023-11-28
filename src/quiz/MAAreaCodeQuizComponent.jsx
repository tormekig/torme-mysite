import { AreaCode, NumberBands } from "../MAAreaCodeComponent.js"
import { generateMAAreaCodeInfo } from "../MAAreaCode.js"

function MAAreaCodeQuestion({ MAComp }) {

	const info = generateMAAreaCodeInfo(MAComp)

    return (
		<div className="MA-question">

			<AreaCode areaCode={info.areaCode}/>
			<NumberBands numberBands={info.numberBands} />

		</div>
	)

}

export default MAAreaCodeQuestion;