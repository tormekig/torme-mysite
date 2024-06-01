import YamanoteInfo from "./YamanoteInfo";
import { ScrollTop } from "./utils/tools";
import './yamanote.css';

function getStation(i) {

    const transferInfos = []

    YamanoteInfo[i].transfers.forEach(function(transfer) {
        const line = transfer.line
        const transferStation = transfer.station;
        const transferStations = getStationsFromLine(line);
        transferInfos.push({
            line: line,
            station: transferStation,
            transferStations: transferStations,
        })
    })

    return {
        name: YamanoteInfo[i].name,
        transferInfos: transferInfos
    }
}

function getStationsFromLine(line) {
    const stations = []

    YamanoteInfo.forEach(function(sta) {
        sta.transfers.forEach(function(transfer) {
            if (line === transfer.line) {
                const transferStation = 
                    (sta.name === transfer.station) ?
                    (sta.name) : 
                    (transfer.station + "(" + sta.name + ")")
                stations.push(transferStation)
            }
        })
    })

    return stations;

}

// function getAllStations() {
//     const stations = []
//     for (let i = 0; i < YamanoteInfo.length; i++) {
//         stations.push(<Station i={i}/>)
//     }
//     return stations;
// }

function getRandomStation() {
    return <Station i={Math.floor( Math.random() * YamanoteInfo.length )}/>
}

function Station({ i }) {

    const stationInfos = getStation(i)

    const ts = []

    function displayTransferStations(transferStations) {
        const stations = []
        transferStations.forEach(function(s, i) {
            stations.push(
                <div key={i}>{s}</div>
            );
        })
        return stations;
    }

    stationInfos.transferInfos.forEach(function(t, i) {
        ts.push(
            <div key={i}>
                <div className="transfer-line-name">{t.line}</div>
                <div className="transfer-station-container">{displayTransferStations(t.transferStations)}</div>
            </div>
        )
    })

    return (
        <div>
            <div className="station-name">{stationInfos.name}</div>
            <div className="transfer-container">{ts}</div>
        </div>
        
    )
}

function Yamanote() {

    return (
        <div>
            <ScrollTop />
            {getRandomStation()}
            <div>
                {/* <button className="btn" onClick={() => window.location.reload()}>もう一度</button> */}
            </div>
        </div>
    )
};

export default Yamanote;