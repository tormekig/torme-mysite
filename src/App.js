function AreaCode({ areaCode }) {
	return (
		<div className="areacode">
			<p>{areaCode}</p>
		</div>
	)
}

function MA({ ma }) {
	return (
		<div className="ma">
			<p>{ma}</p>
		</div>
	)
}

function Pref({ pref }) {
	return (
		<div className="pref">
			<p>{pref}</p>
		</div>
	)
}

function NumberBands({ numberBands }) {

	const lis = [];

	numberBands.forEach(function(numberBand, i) {
		let txt = numberBand.start
		if (numberBand.start !== numberBand.end) {
			txt += " ～ " + numberBand.end;
		} 
		lis.push(
			<li key={i}>
				<div>{txt}</div>
			</li>
		)
	})

	return (
		<div>
			<ul className="numberBands">{lis}</ul>
		</div>
	)

}

function InfoTable({ maDistinct, compartmentCode, square, numberDesignations }) {

	function NumberDesignations(numberDesignations) {

		const txt = [];
	
		numberDesignations.forEach(function(numberDesignation, i) {
			
			let tmp = numberDesignation.start
			if (numberDesignation.start !== numberDesignation.end) {
				tmp += " ～ " + numberDesignation.end;
			} 
			txt.push(
				<div key={i}>{tmp}</div>
			)

		})
		
		return txt;
		
	}
	
	return (
		<table>
			<tbody>
				{/* <tr>
					<td>MA独立番号</td>
					<td>{maDistinct}</td>
				</tr> */}
				<tr>
					<td>番号区画コード</td>
					<td>{compartmentCode}</td>
				</tr>
				<tr>
					<td>方形区画</td>
					<td>{square}</td>
				</tr>
				<tr>
					<td>MA電気通信番号指定状況</td>
					<td>{NumberDesignations(numberDesignations)}</td>
				</tr>
			</tbody>
		</table>
	)
}


function classifyCities(cities) {

	const classifiedCities = {}

	for (const city of cities) {

		if (!(city.pref in classifiedCities)) {
			classifiedCities[city.pref] = {}
		}

		let county = city.county.name + city.county.type
		if (!(county in classifiedCities[city.pref])) {
			classifiedCities[city.pref][county] = []
		}

		classifiedCities[city.pref][county].push(city)

	}
	
	return classifiedCities;

}

function Cities({ classifiedCities }) {

	const displayCities = (pref, county) => {

		const cities = [];

		classifiedCities[pref][county].forEach(function(city, i) {
			// let zone = ""
			let zone = city.zone.name ? <small> ({city.zone.name})</small> : null;

			cities.push(
				<span className="city" key={i}>
					{city.name}{city.type}{zone}
				</span>
			)
		})

		return <ul>{cities}</ul>

	}

	const displayCounties = (pref) => {

		const counties = [];

		Object.keys(classifiedCities[pref]).forEach(function(county, i) {
			let li = null;
			if (county) {
				li = (
					<li className="cityListwithBorder" key={i}>
						<div>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			} else {
				li = (
					<li className="cityList" key={i}>
						<div>{county}</div>
						{ displayCities(pref, county) }
					</li>
				)
			}
			counties.push(li)
		})

		return <ul className="countyList">{counties}</ul>

	}

	const displayPref = () => {

		const prefs = [];

		Object.keys(classifiedCities).forEach(function(pref, i) {
			prefs.push(
				<li key={i}>
					<div className="prefofCities">
						<p>{pref}</p>
					</div>
					{ displayCounties(pref) }
				</li>
			)
		})

		return <ul>{prefs}</ul>

	}

	return <div>{ displayPref() }</div>

}

function MAAreaCodeInfo() {

	const info = {
		areaCode: "0152",
		ma: "網走",
		maDistinct: "1",
		compartmentCode: "43",
		pref: "北海道",
		square: "861-622",
		numberBands: [
			{
				start: "0152-1",
				end: "0152-1",
				note: []
			},
			{
				start: "0152-4",
				end: "0152-6",
				note: []
			}
		],
		numberDesignations: [
			{
				start: "015240",
				end: "015269",
				note: []
			},
		],
		cities: [
			{
				code: "01208",
				distinct: "1",
				pref: "北海道",
				county: {
					name: "",
					kana: "",
					type: "",
					typeKana: "",
				},
				name: "北見",
				kana: "きたみ",
				type: "市",
				typeKana: "し",
				zone: {
					name: "常呂町",
					scale: ""
				}
			},
			{
				code: "01211",
				distinct: "1",
				pref: "北海道",
				county: {
					name: "",
					kana: "",
					type: "",
					typeKana: "",
				},
				name: "網走",
				kana: "あばしり",
				type: "市",
				typeKana: "し",
				zone: {
					name: "",
					scale: ""
				}
			},
			{
				code: "01547",
				distinct: "1",
				pref: "北海道",
				county: {
					name: "斜里",
					kana: "しゃり",
					type: "郡",
					typeKana: "ぐん",
				},
				name: "小清水",
				kana: "こしみず",
				type: "町",
				typeKana: "町",
				zone: {
					name: "",
					scale: ""
				}
			},
			{
				code: "01564",
				distinct: "1",
				pref: "北海道",
				county: {
					name: "網走",
					kana: "あばしり",
					type: "郡",
					typeKana: "ぐん",
				},
				name: "大空",
				kana: "おおぞら",
				type: "町",
				typeKana: "ちょう",
				zone: {
					name: "東藻琴、東藻琴清浦、東藻琴栄、東藻琴新富、東藻琴末広、東藻琴大進、東藻琴千草、東藻琴西倉、東藻琴福富、東藻琴明生及び東藻琴山園に限る。",
					scale: ""
				}
			},
		]
	}

	return (
		<div className="info">

			<AreaCode areaCode={info.areaCode}/>

			<NumberBands numberBands={info.numberBands} />

			<div className="MApref">
				<Pref pref={info.pref} />
				<MA ma={info.ma} />
			</div>

			<div className="citiesContainer">
				<Cities classifiedCities={classifyCities(info.cities)} />
			</div>

			<div className="infoTableContainer">
				<InfoTable
					maDistinct={info.maDistinct}
					compartmentCode={info.compartmentCode}
					square={info.square}
					numberDesignations={info.numberDesignations}
				/>
			</div>
		</div>
	)

}

export default function App() {
	return (
		<div>
			<MAAreaCodeInfo />
		</div>
	);
}