
import areacode from "areacode/assets/css/areacode.module.scss";

import { ScrollTop } from "utils/tools";
import { Appendix } from './appendix';
import { AllCode3digit, Header, PrefList, SearchCity, SearchPushNumber } from '../../components';

const Top = () => {

    return (
        <div className={areacode.areacodeBody}>
            <ScrollTop />
            <Header />
            <div className={areacode.mainContent}>
				<div className={areacode.maAreaCodeContainer}>
                    <div className={areacode.searchBox}>
                        <SearchPushNumber />
                    </div>
                    <AllCode3digit />
                    <SearchCity />
                    <PrefList />
                    <Appendix />
                    <div className={areacode.copyrightContainer}>
                        <p>Copyright 2023 torme_kig All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Top;