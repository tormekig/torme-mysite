import React, { useEffect, useState } from 'react'
import Map, {
  Source,
  Layer,
  Popup,
  FillLayerSpecification,
} from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as topojson from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAAreaCodeInfoCards } from 'areacode/pages/list/components'
import { getColorStyleByAreaCode } from 'areacode/components'

const MA_MAP_STYLE =
  'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json'

type PopupInfoType = {
  longitude: number
  latitude: number
  properties: any
}
function App() {
  const [geoData, setGeoData] = useState<any>(null)
  const [hoverId, setHoverId] = useState<string | number | null>(null)
  const [popupInfo, setPopupInfo] = useState<PopupInfoType | null>(null)

  useEffect(() => {
    fetch('/map/areacode.json')
      // GeoJSON is simplified to TopoJSON on https://mapshaper.org/
      .then((res) => res.json())
      .then((topoData) => {
        const geojson = topojson.feature(
          topoData,
          topoData.objects.areacode,
        ) as unknown as FeatureCollection<Geometry>
        geojson.features = geojson.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            fillColor: getColorStyleByAreaCode(`0${f.properties['_市外局番']}`)
              .background.backgroundColor,
          },
        }))
        setGeoData(geojson)
      })
  }, [])

  const onClick = (event: any) => {
    const feature = event.features && event.features[0]
    if (feature) {
      setPopupInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        properties: feature.properties,
      })
    }
  }

  const onHover = (event: any) => {
    const { features, target } = event
    if (features && features.length > 0) {
      const nextHoverId = features[0].id
      if (hoverId !== null) {
        target.setFeatureState(
          { source: 'ma-source', id: hoverId },
          { hover: false },
        )
      }
      if (nextHoverId !== undefined) {
        target.setFeatureState(
          { source: 'ma-source', id: nextHoverId },
          { hover: true },
        )
        setHoverId(nextHoverId)
      }
    }
  }

  const fillStyle: FillLayerSpecification = {
    source: 'ma-source',
    id: 'ma-fills',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'fillColor'],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.5,
        1.0,
      ],
    },
  }

  return (
    <Map
      initialViewState={{
        longitude: 139.76711,
        latitude: 35.68074,
        zoom: 6,
      }}
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
      mapStyle={MA_MAP_STYLE}
      onClick={onClick}
      onMouseMove={onHover}
      onMouseLeave={() => {
        if (hoverId !== null) {
          setHoverId(null)
        }
      }}
      interactiveLayerIds={['ma-fills']}
    >
      {geoData && (
        <Source id="ma-source" type="geojson" data={geoData} generateId={true}>
          <Layer {...fillStyle}></Layer>
        </Source>
      )}
      {popupInfo && (
        <PopupInfo info={popupInfo} setFunc={setPopupInfo}></PopupInfo>
      )}
    </Map>
  )
}

function PopupInfo({
  info,
  setFunc,
}: {
  info: PopupInfoType
  setFunc: React.Dispatch<React.SetStateAction<PopupInfoType | null>>
}) {
  const displayParam = [
    '市外局番',
    '番号領域',
    '都道府県',
    'MA名',
    '市区町村',
    '一部地域詳細表示',
  ]
  const cityOptions = {
    areaDisplayFull: displayParam.includes('一部地域詳細表示'),
    isQuiz: false,
  }
  // TODO: MA一意になるようにする
  const { MAComps } = new MACompListContent().filter(
    'MA',
    info.properties['_MA名'],
  )
  return (
    <Popup
      longitude={info.longitude}
      latitude={info.latitude}
      anchor="bottom"
      onClose={() => setFunc(null)}
      closeOnClick={false}
    >
      <MAAreaCodeInfoCards
        MAComps={MAComps}
        displayParam={displayParam}
        cityOptions={cityOptions}
      />
    </Popup>
  )
}

export default App
