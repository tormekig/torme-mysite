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

type HoverState = {
  sourceId: 'ma-source' | 'digits2-source'
  featureId: string | number
}

const EMPTY_FEATURE_COLLECTION: FeatureCollection<Geometry> = {
  type: 'FeatureCollection',
  features: [],
}

function App() {
  const [maGeoData, setMaGeoData] = useState<FeatureCollection<Geometry>>(
    EMPTY_FEATURE_COLLECTION,
  )
  const [digits2GeoData, setDigits2GeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)
  const [showMA, setShowMA] = useState(true)
  const [showDigits2, setShowDigits2] = useState(true)

  const [popupInfo, setPopupInfo] = useState<PopupInfoType | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)

  const hoverRef = useRef<HoverState | null>(null)

  useEffect(() => {
    fetch('/map/areacode.json')
      // GeoJSON is simplified to TopoJSON on https://mapshaper.org/
      .then((res) => res.json())
      .then((topoData) => {
        const geojson = topojson.feature(
          topoData,
          topoData.objects.areacode,
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
        setMaGeoData(geojson)
      })
  }, [])

  useEffect(() => {
    fetch('/map/digits2.json')
      // GeoJSON is simplified to TopoJSON on https://mapshaper.org/
      .then((res) => res.json())
      .then((topoData) => {
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
        setDigits2GeoData(geojson)
      })
  }, [])

  const clearHoverState = useCallback(() => {
    if (!mapRef.current || hoverRef.current === null) {
      return
    }

    mapRef.current.setFeatureState(
      { source: hoverRef.current.sourceId, id: hoverRef.current.featureId },
      { hover: false },
    )
    hoverRef.current = null
  }, [])

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0]
    if (!feature || feature.source !== 'ma-source' || !feature.properties) {
      setPopupInfo(null)
      return
    }

    setPopupInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      properties: feature.properties as Record<string, string>,
    })
  }, [])

  const onHover = useCallback(
    (event: MapLayerMouseEvent) => {
      mapRef.current = event.target
      const feature = event.features?.[0]
      const nextHoverId = feature?.id
      const sourceId = feature?.source as HoverState['sourceId'] | undefined

      if (nextHoverId === undefined || !sourceId) {
        clearHoverState()
        return
      }
      if (
        hoverRef.current?.sourceId === sourceId &&
        hoverRef.current.featureId === nextHoverId
      ) {
        return
      }

      clearHoverState()
      event.target.setFeatureState(
        { source: sourceId, id: nextHoverId },
        { hover: true },
      )
      hoverRef.current = { sourceId, featureId: nextHoverId }
    },
    [clearHoverState],
  )

  useEffect(() => {
    return () => {
      clearHoverState()
    }
  }, [clearHoverState])

  const maFillStyle: FillLayerSpecification = {
    source: 'ma-source',
    id: 'ma-fills',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'fillColor'],
      'fill-outline-color': ['get', 'fillColor'],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.55,
        0.85,
      ],
    },
  }

  const maBorderStyle: LineLayerSpecification = {
    source: 'ma-source',
    id: 'ma-borders',
    type: 'line',
    paint: {
      'line-color': '#1a1a1a',
      'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.4, 8, 1.2],
      'line-opacity': 0.7,
    },
  }

  const maLabelStyle: SymbolLayerSpecification = {
    source: 'ma-source',
    id: 'ma-labels',
    type: 'symbol',
    layout: {
      'text-field': ['coalesce', ['get', '_MA名']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 8, 8, 11],
      'text-font': ['Roboto', 'Noto Sans JP', 'sans-serif'],
      'text-allow-overlap': false,
      'text-ignore-placement': false,
    },
    paint: {
      'text-color': '#111827',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1.1,
      'text-halo-blur': 0.2,
    },
  }

  const digits2BorderStyle: LineLayerSpecification = {
    source: 'digits2-source',
    id: 'digits2-borders',
    type: 'line',
    paint: {
      'line-color': '#374151',
      'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 8, 2.0],
      'line-opacity': 0.85,
    },
  }

  const digits2LabelStyle: SymbolLayerSpecification = {
    source: 'digits2-source',
    id: 'digits2-labels',
    type: 'symbol',
    layout: {
      'text-field': ['coalesce', ['get', '市外局番2桁']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 20, 8, 30],
      'text-font': ['Roboto', 'sans-serif'],
      'text-allow-overlap': false,
      'text-ignore-placement': false,
    },
    paint: {
      'text-color': '#111827',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1.3,
      'text-halo-blur': 0.2,
    },
  }

  const interactiveLayerIds = [
    ...(showMA ? ['ma-fills'] : []),
    ...(showDigits2 ? ['digits2-fills'] : []),
  ]

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 12,
          left: 12,
          padding: '8px 12px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 14,
        }}
      >
        <label style={{ display: 'block', marginBottom: 4 }}>
          <input
            type="checkbox"
            checked={showMA}
            onChange={(event) => setShowMA(event.target.checked)}
          />{' '}
          MA地図
        </label>
        <label style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={showDigits2}
            onChange={(event) => setShowDigits2(event.target.checked)}
          />{' '}
          市外局番2桁地図
        </label>
      </div>
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
        onMouseLeave={clearHoverState}
        interactiveLayerIds={interactiveLayerIds}
      >
        {maGeoData && (
          <Source
            id="ma-source"
            type="geojson"
            data={maGeoData}
            generateId={true}
          >
            <Layer
              {...maFillStyle}
              layout={{ visibility: showMA ? 'visible' : 'none' }}
            ></Layer>
            <Layer
              {...maBorderStyle}
              layout={{ visibility: showMA ? 'visible' : 'none' }}
            ></Layer>
            <Layer
              {...maLabelStyle}
              layout={{
                ...maLabelStyle.layout,
                visibility: showMA ? 'visible' : 'none',
              }}
            ></Layer>
          </Source>
        )}
        {digits2GeoData && (
          <Source
            id="digits2-source"
            type="geojson"
            data={digits2GeoData}
            generateId={true}
          >
            <Layer
              {...digits2BorderStyle}
              layout={{ visibility: showDigits2 ? 'visible' : 'none' }}
            ></Layer>
            <Layer
              {...digits2LabelStyle}
              layout={{
                ...digits2LabelStyle.layout,
                visibility: showDigits2 ? 'visible' : 'none',
              }}
            ></Layer>
          </Source>
        )}
        {popupInfo && <PopupInfo info={popupInfo} setFunc={setPopupInfo} />}
      </Map>
    </div>
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
