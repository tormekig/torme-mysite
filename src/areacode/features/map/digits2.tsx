import React, { useCallback, useEffect, useRef, useState } from 'react'
import Map, {
  Source,
  Layer,
  Popup,
  FillLayerSpecification,
} from 'react-map-gl/maplibre'
import type {
  LineLayerSpecification,
  MapLayerMouseEvent,
  Map as MapLibreMap,
  SymbolLayerSpecification,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as topojson from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAAreaCodeInfoCards } from 'areacode/pages/list/components'
import { getColorStyleByAreaCode } from 'areacode/components'

const MA_MAP_STYLE =
  'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json'

type PopupInfoType = {
  longitude: number
  latitude: number
  properties: Record<string, string>
}
function App() {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry> | null>(
    null,
  )
  const [popupInfo, setPopupInfo] = useState<PopupInfoType | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const hoverIdRef = useRef<string | number | null>(null)

  useEffect(() => {
    fetch('/map/digits2.json')
      // GeoJSON is simplified to TopoJSON on https://mapshaper.org/
      .then((res) => res.json())
      .then((topoData) => {
        console.log(topoData.objects)
        const geojson = topojson.feature(
          topoData,
          topoData.objects['2digits'],
        ) as unknown as FeatureCollection<Geometry>
        geojson.features = geojson.features.map((f: Feature<Geometry>) => {
          const properties = (f.properties ?? {}) as Record<string, string>
          return {
            ...f,
            properties: {
              ...properties,
              fillColor: getColorStyleByAreaCode(`0${properties['_市外局番']}`)
                .background.backgroundColor,
            },
          }
        })
        setGeoData(geojson)
      })
  }, [])

  const clearHoverState = useCallback(() => {
    if (!mapRef.current || hoverIdRef.current === null) {
      return
    }

    mapRef.current.setFeatureState(
      { source: 'ma-source', id: hoverIdRef.current },
      { hover: false },
    )
    hoverIdRef.current = null
  }, [])

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0]
    if (feature) {
      setPopupInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        properties: feature.properties,
      })
    }
  }

  const onHover = useCallback(
    (event: MapLayerMouseEvent) => {
      mapRef.current = event.target
      const feature = event.features?.[0]
      const nextHoverId = feature?.id

      if (nextHoverId === undefined) {
        clearHoverState()
        return
      }

      if (hoverIdRef.current === nextHoverId) {
        return
      }

      clearHoverState()
      event.target.setFeatureState(
        { source: 'ma-source', id: nextHoverId },
        { hover: true },
      )
      hoverIdRef.current = nextHoverId
    },
    [clearHoverState],
  )

  useEffect(() => {
    return () => {
      clearHoverState()
    }
  }, [clearHoverState])

  const borderStyle: LineLayerSpecification = {
    source: 'ma-source',
    id: 'ma-borders',
    type: 'line',
    paint: {
      'line-color': '#1a1a1a',
      'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.4, 8, 1.2],
      'line-opacity': 0.8,
    },
  }

  const labelStyle: SymbolLayerSpecification = {
    source: 'ma-source',
    id: 'ma-labels',
    type: 'symbol',
    layout: {
      'text-field': ['coalesce', ['get', '市外局番2桁']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 9, 8, 12],
      'text-font': ['Noto Sans Regular'],
      'text-allow-overlap': false,
      'text-ignore-placement': false,
    },
    paint: {
      'text-color': '#111827',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1.2,
      'text-halo-blur': 0.2,
    },
  }

  const fillStyle: FillLayerSpecification = {
    source: 'ma-source',
    id: 'ma-fills',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'fillColor'],
      'fill-outline-color': ['get', 'fillColor'],
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
      // mapStyle={MA_MAP_STYLE}
      // onClick={onClick}
      onMouseMove={onHover}
      onMouseLeave={clearHoverState}
      interactiveLayerIds={['ma-fills']}
    >
      {geoData && (
        <Source id="ma-source" type="geojson" data={geoData} generateId={true}>
          <Layer {...fillStyle}></Layer>
          <Layer {...borderStyle}></Layer>
          <Layer {...labelStyle}></Layer>
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
