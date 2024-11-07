import React from 'react'
import YamanoteInfo from 'yamanote/YamanoteInfo'
import './yamanote.css'
import { ScrollTop } from 'utils/tools'

interface TransferInformation {
  line: string
  station: string
  transferStations: string[]
}

function getStation(i: number): {
  name: string
  transferInfos: TransferInformation[]
} {
  const transferInfos: TransferInformation[] = []

  YamanoteInfo[i].transfers.forEach(function (transfer) {
    transferInfos.push({
      line: transfer.line,
      station: transfer.station,
      transferStations: getStationsFromLine(transfer.line),
    })
  })

  return {
    name: YamanoteInfo[i].name,
    transferInfos: transferInfos,
  }
}

function getStationsFromLine(line: string): string[] {
  const stations: string[] = []

  YamanoteInfo.forEach(function (sta) {
    sta.transfers.forEach(function (transfer) {
      if (line === transfer.line) {
        const transferStation =
          sta.name === transfer.station
            ? sta.name
            : transfer.station + '(' + sta.name + ')'
        stations.push(transferStation)
      }
    })
  })

  return stations
}

// function getAllStations() {
//     const stations = []
//     for (let i = 0; i < YamanoteInfo.length; i++) {
//         stations.push(<Station i={i}/>)
//     }
//     return stations;
// }

function getRandomStation(): React.JSX.Element {
  return <Station i={Math.floor(Math.random() * YamanoteInfo.length)} />
}

function Station({ i }: { i: number }) {
  const stationInfos = getStation(i)

  const ts: React.JSX.Element[] = []

  function displayTransferStations(
    transferStations: string[],
  ): React.JSX.Element[] {
    const stations: React.JSX.Element[] = []
    transferStations.forEach(function (s, i) {
      stations.push(<div key={i}>{s}</div>)
    })
    return stations
  }

  stationInfos.transferInfos.forEach(function (t, i) {
    ts.push(
      <div key={i}>
        <div className="transfer-line-name">{t.line}</div>
        <div className="transfer-station-container">
          {displayTransferStations(t.transferStations)}
        </div>
      </div>,
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
}

export default Yamanote
