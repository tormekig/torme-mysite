import { shuffleArray } from "../utils/tools";
import { convertCompCode } from "./MAAreaCode";
import MACompList from "./data/MACompList";
import cityList, { getCityName, getPrefCountyCityName, getPrefCountyName } from "./data/cityList";
import { getPrefName } from "./data/prefList";

export function searchMAAreaCodeInfos(type, query, shuffle=false) {

	let MAComps = [];
	let headerInfo = {
		mainHeaderSub: "",
		mainHeader: query,
		mainHeaderLink: "",
		subHeader: "",
	}

	switch (type) {

		case "MA" : // MA name

			headerInfo.subHeader = "MA名検索"

			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.MAName === query;
			})
			break;

		case "pref":

			headerInfo.subHeader = "都道府県名検索"

			const citiesByPref = cityList.filter(function(city) {
				return getPrefName(city) === query;
			})

			citiesByPref.forEach(function(city) {
				let MAtemp = MACompList.concat().filter((m) => {
					return convertCompCode(m) === city.compartmentCode;
				})
				MAComps = MAComps.concat(MAtemp)
			})
			MAComps = [...new Set(MAComps)];
			MAComps.sort((a, b) =>
				+a.MAnum > +b.MAnum ? 1 : -1
			);
			break;

		case "city":

			headerInfo.subHeader = "市町村名検索"

			const cities = cityList.filter(function(city) {
				return getPrefCountyCityName(city) === query;
			})

			cities.forEach(function(city) {
				let MAtemp = MACompList.concat().filter((m) => {
					return convertCompCode(m) === city.compartmentCode;
				})
				MAComps = MAComps.concat(MAtemp)
			})

			headerInfo.mainHeaderSub = getPrefCountyName(cities[0]);
			headerInfo.mainHeader = getCityName(cities[0]);
			headerInfo.mainHeaderLink = "https://www.google.com/maps/place/" + query;
			break;

		case "code": // areacode start digit

			headerInfo.subHeader = "市外局番検索（完全一致）"

			query = query.slice(1, query.length)
			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.areaCode === query;
			})
			break;

		case "code_prefix": // areacode start digit

			headerInfo.subHeader = "市外局番検索（前方一致）"

			query = query.slice(1, query.length)
			MAComps = MACompList.concat().filter(function(MAComp) {
				return MAComp.areaCode.slice(0, query.length) === query;
			})
			break;

		case "all":

			headerInfo.mainHeader = "全て"

			MAComps = MACompList.concat();
			break;

		case "random":

			headerInfo.mainHeader = "ランダム表示"

			MAComps = shuffleArray(MACompList.concat()).slice(0, 1);
			break;

		default:
			break;

	}

	if (shuffle) {

		headerInfo.subHeader += "（シャッフル）"
		MAComps = shuffleArray(MAComps)
		
	}

	return [headerInfo, MAComps];

}