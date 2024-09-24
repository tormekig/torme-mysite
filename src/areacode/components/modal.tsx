import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AllCode3digit, PrefList, SearchCity } from "./";

export function SearchModal({ closeFunc }: { closeFunc: () => void }) {
	return (
		<div>
			<Tabs className="searchDetailBox">
				<TabList>
					<Tab>3桁表</Tab>
					<Tab>都道府県</Tab>
					<Tab>市区町村</Tab>
				</TabList>
			
				<TabPanel>
					<AllCode3digit closeFunc={closeFunc} />
				</TabPanel>
				<TabPanel>
					<PrefList closeFunc={closeFunc} />
				</TabPanel>
				<TabPanel>
					<SearchCity closeFunc={closeFunc} />
				</TabPanel>
			</Tabs>
			<div className="modalCloseButton" onClick={() => {closeFunc();}}>
				<span>閉じる</span>
			</div>
		</div>
	)
}