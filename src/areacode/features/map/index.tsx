import React, { useCallback, useMemo, useRef, useState } from 'react'
import Map from 'react-map-gl/maplibre'
import type {
  Feature,
  FeatureCollection,
  Geometry,
  Position,
  BBox,
} from 'geojson'
import type { MapLayerMouseEvent, Map as MapLibreMap } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './map.css'
import { MA_MAP_STYLE } from './mapStyles'
import { useMapGeoData } from './hooks/useMapGeoData'
import type { ActiveMAInfo, HoverState } from './types'
import { MapLayers } from './components/MapLayers'
import { ActiveMAPanel } from './components/ActiveMAPanel'
import prefList from 'areacode/data/prefList'
import cityList from 'areacode/data/cityList'
import { getAvailableThreeDigitNumbers } from 'areacode/components/numberTable'
import {
  MACompListContent,
  type SearchType,
} from 'areacode/pages/list/MACompListContent'

function flattenCoordinates(geometry: Geometry): Position[] {
  switch (geometry.type) {
    case 'Point':
      return [geometry.coordinates]
    case 'MultiPoint':
    case 'LineString':
      return geometry.coordinates
    case 'MultiLineString':
    case 'Polygon':
      return geometry.coordinates.flat(1)
    case 'MultiPolygon':
      return geometry.coordinates.flat(2)
    default:
      return []
  }
}

function getFeaturesBounds(features: Feature<Geometry>[]): BBox | null {
  const points = features.flatMap((feature) =>
    flattenCoordinates(feature.geometry),
  )
  if (points.length === 0) {
    return null
  }

  let minLng = Infinity
  let maxLng = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  points.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  })

  return [minLng, minLat, maxLng, maxLat]
}

function toMAKey(areaCode: string, MAName: string): string {
  return `${areaCode}|${MAName}`
}

function getMAKeySetFromFilter(type: SearchType, query: string): Set<string> {
  const MAComps = new MACompListContent().filter(type, query).MAComps
  return new Set(
    MAComps.map((maComp) => toMAKey(maComp.areaCode, maComp.MAName)),
  )
}

function App() {
  const { maGeoData, digits2GeoData } = useMapGeoData()
  const [showMA, setShowMA] = useState(true)
  const [showDigits2, setShowDigits2] = useState(true)
  const [activeMAs, setActiveMAs] = useState<ActiveMAInfo[]>([])
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)
  const [mapZoom, setMapZoom] = useState(6)
  const [selectedPref, setSelectedPref] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDigits3, setSelectedDigits3] = useState('')

  const mapRef = useRef<MapLibreMap | null>(null)
  const hoverRef = useRef<HoverState | null>(null)

  const prefOptions = useMemo(() => prefList.map((pref) => pref.name), [])
  const cityOptions = useMemo(
    () => cityList.filter((city) => city.distinct === '1'),
    [],
  )
  const digits3Options = useMemo(() => getAvailableThreeDigitNumbers(), [])

  const activateFeatures = useCallback(
    (predicate: (properties: Record<string, string>) => boolean) => {
      const matchedActiveMAs: Array<ActiveMAInfo | null> =
        maGeoData.features.map((feature, index) => {
          const properties = (feature.properties ?? {}) as Record<
            string,
            string
          >
          if (!feature.geometry || !predicate(properties)) {
            return null
          }

          const featureId: ActiveMAInfo['featureId'] = index
          const activeFeature: Feature<Geometry> = {
            type: 'Feature',
            id: featureId,
            properties,
            geometry: feature.geometry,
          }

          return {
            featureId,
            properties,
            feature: activeFeature,
          }
        })
      const nextActiveMAs = matchedActiveMAs.filter(
        (item): item is ActiveMAInfo => item !== null,
      )

      setActiveMAs(nextActiveMAs)

      const bounds = getFeaturesBounds(
        nextActiveMAs.map((activeMA) => activeMA.feature),
      )
      if (!bounds || !mapRef.current) {
        return
      }

      mapRef.current.fitBounds(
        [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ],
        {
          padding: { top: 40, right: 40, bottom: 40, left: 40 },
          duration: 800,
          maxZoom: 10,
        },
      )
    },
    [maGeoData.features],
  )

  const activateByMAKeySet = useCallback(
    (maKeySet: Set<string>) => {
      activateFeatures((properties) =>
        maKeySet.has(toMAKey(properties['_市外局番'], properties['_MA名'])),
      )
    },
    [activateFeatures],
  )

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

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      mapRef.current = event.target
      const feature = event.features?.[0]

      if (
        !feature ||
        feature.source !== 'ma-source' ||
        !feature.properties ||
        !feature.geometry ||
        feature.id === undefined
      ) {
        return
      }

      setSelectedPref('')
      setSelectedCity('')
      setSelectedDigits3('')

      const featureId = feature.id
      const sourceFeature =
        typeof featureId === 'number'
          ? maGeoData.features[featureId]
          : undefined

      const properties =
        (sourceFeature?.properties as Record<string, string> | undefined) ??
        (feature.properties as Record<string, string>)

      const geometry =
        (sourceFeature?.geometry as Geometry | undefined) ??
        (feature.geometry as Geometry)

      const activeFeature: Feature<Geometry> = {
        type: 'Feature',
        id: featureId,
        properties,
        geometry,
      }

      setActiveMAs((prev) => {
        const alreadyActive = prev.some((ma) => ma.featureId === featureId)
        if (alreadyActive) {
          return []
        }
        return [{ featureId, properties, feature: activeFeature }]
      })
    },
    [maGeoData.features],
  )

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

  const handlePrefSelect = useCallback(
    (pref: string) => {
      setSelectedPref(pref)
      setSelectedCity('')
      setSelectedDigits3('')

      if (!pref) {
        setActiveMAs([])
        return
      }

      activateByMAKeySet(getMAKeySetFromFilter('pref', pref))
    },
    [activateByMAKeySet],
  )

  const handleCitySelect = useCallback(
    (cityName: string) => {
      setSelectedPref('')
      setSelectedCity(cityName)
      setSelectedDigits3('')

      if (!cityName) {
        setActiveMAs([])
        return
      }

      activateByMAKeySet(getMAKeySetFromFilter('city', cityName))
    },
    [activateByMAKeySet],
  )

  const handleDigits3Select = useCallback(
    (digits3: string) => {
      setSelectedPref('')
      setSelectedCity('')
      setSelectedDigits3(digits3)

      if (!digits3) {
        setActiveMAs([])
        return
      }

      activateByMAKeySet(getMAKeySetFromFilter('code_prefix', `${digits3}`))
    },
    [activateByMAKeySet],
  )

  const activeMAFeatureCollection = useMemo<FeatureCollection<Geometry>>(
    () => ({
      type: 'FeatureCollection',
      features: activeMAs.map((activeMA) => activeMA.feature),
    }),
    [activeMAs],
  )

  const interactiveLayerIds = [
    ...(showMA ? ['ma-fills'] : []),
    ...(showDigits2 ? ['digits2-fills'] : []),
  ]

  return (
    <div className="map-app-layout">
      <div className="map-canvas-wrap">
        <div className="map-layer-toggle">
          <label className="map-layer-toggle-item with-margin">
            <input
              type="checkbox"
              checked={showMA}
              onChange={(event) => setShowMA(event.target.checked)}
            />{' '}
            MA地図
          </label>
          <label className="map-layer-toggle-item">
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
          onLoad={(event) => {
            mapRef.current = event.target
          }}
          onClick={onClick}
          onMouseMove={onHover}
          onMouseLeave={clearHoverState}
          onMove={(event) => setMapZoom(event.viewState.zoom)}
          interactiveLayerIds={interactiveLayerIds}
        >
          <MapLayers
            maGeoData={maGeoData}
            digits2GeoData={digits2GeoData}
            activeMAFeatureCollection={activeMAFeatureCollection}
            showMA={showMA}
            showDigits2={showDigits2}
            zoom={mapZoom}
          />
        </Map>
      </div>

      <ActiveMAPanel
        activeMAs={activeMAs}
        isExpanded={isPanelExpanded}
        onToggleExpand={() => setIsPanelExpanded((prev) => !prev)}
        prefOptions={prefOptions}
        cityOptions={cityOptions}
        digits3Options={digits3Options}
        selectedPref={selectedPref}
        selectedCity={selectedCity}
        selectedDigits3={selectedDigits3}
        onPrefSelect={handlePrefSelect}
        onCitySelect={handleCitySelect}
        onDigits3Select={handleDigits3Select}
      />
    </div>
  )
}

export default App
