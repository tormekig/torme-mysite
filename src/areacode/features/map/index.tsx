import React, { useCallback, useMemo, useRef, useState } from 'react'
import MapView from 'react-map-gl/maplibre'
import type { Feature, Geometry } from 'geojson'
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  Map as MapLibreMap,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './map.css'
import { MA_MAP_STYLE } from './mapStyles'
import { useMapGeoData } from './hooks/useMapGeoData'
import type { ActiveGeometryInfo, HoverState } from './types'
import { MapLayers } from './components/MapLayers'
import { ActiveMAPanel } from './components/ActiveMAPanel'
import {
  buildActiveGeometryList,
  toFeatureCollection,
} from './utils/activeGeometry'
import { getFeaturesBounds } from './utils/geometry'
import { getMAKeysFromFilter, toMAKey } from './utils/maSearch'
import prefList from 'areacode/data/prefList'
import cityList from 'areacode/data/cityList'
import { getAvailableThreeDigitNumbers } from 'areacode/components/numberTable'

function App() {
  const { maGeoData, digits2GeoData, prefGeoData, cityGeoData } =
    useMapGeoData()
  const [showMA, setShowMA] = useState(true)
  const [showDigits2, setShowDigits2] = useState(true)
  const [showPref, setShowPref] = useState(true)
  const [showCity, setShowCity] = useState(true)
  const [activeMAs, setActiveMAs] = useState<ActiveGeometryInfo[]>([])
  const [activePrefs, setActivePrefs] = useState<ActiveGeometryInfo[]>([])
  const [activeCities, setActiveCities] = useState<ActiveGeometryInfo[]>([])
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

  const activateMAFeatures = useCallback(
    (
      predicate: (properties: Record<string, string>) => boolean,
      orderedMAKeys: string[] = [],
    ) => {
      const nextActiveMAs = buildActiveGeometryList(
        maGeoData.features,
        predicate,
      )

      if (orderedMAKeys.length > 0) {
        const keyOrder = orderedMAKeys.reduce<Record<string, number>>(
          (order, key, index) => {
            order[key] = index
            return order
          },
          {},
        )
        nextActiveMAs.sort((a, b) => {
          const aIndex =
            keyOrder[
              toMAKey(a.properties['_市外局番'], a.properties['_MA名'])
            ] ?? Number.MAX_SAFE_INTEGER
          const bIndex =
            keyOrder[
              toMAKey(b.properties['_市外局番'], b.properties['_MA名'])
            ] ?? Number.MAX_SAFE_INTEGER

          if (aIndex !== bIndex) {
            return aIndex - bIndex
          }

          if (
            typeof a.featureId === 'number' &&
            typeof b.featureId === 'number'
          ) {
            return a.featureId - b.featureId
          }

          return String(a.featureId).localeCompare(String(b.featureId))
        })
      }

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
          padding: { top: 100, right: 100, bottom: 100, left: 100 },
          duration: 1500,
          maxZoom: 10,
        },
      )
    },
    [maGeoData.features],
  )

  const activateByMAKeys = useCallback(
    (orderedMAKeys: string[]) => {
      const maKeySet = new Set(orderedMAKeys)
      activateMAFeatures(
        (properties) =>
          maKeySet.has(toMAKey(properties['_市外局番'], properties['_MA名'])),
        orderedMAKeys,
      )
    },
    [activateMAFeatures],
  )

  const activatePrefFeatures = useCallback(
    (predicate: (properties: Record<string, string>) => boolean) => {
      setActivePrefs(buildActiveGeometryList(prefGeoData.features, predicate))
    },
    [prefGeoData.features],
  )

  const activatePrefKeys = useCallback(
    (prefNames: string[]) => {
      const prefNameSet = new Set(prefNames)
      activatePrefFeatures((properties) =>
        prefNameSet.has(properties['PREF_NAME']),
      )
    },
    [activatePrefFeatures],
  )

  const activateCityFeatures = useCallback(
    (predicate: (properties: Record<string, string>) => boolean) => {
      setActiveCities(buildActiveGeometryList(cityGeoData.features, predicate))
    },
    [cityGeoData.features],
  )

  const activateCityKeys = useCallback(
    (cityNames: string[]) => {
      const cityNamesSet = new Set(cityNames)
      // TODO: 郡名を考慮する
      activateCityFeatures((properties) =>
        cityNamesSet.has(
          `${properties['PREF_NAME']}${properties['CITY_NAME']}`,
        ),
      )
    },
    [activateCityFeatures],
  )

  const handleCityLabelClick = useCallback(
    (prefName: string, cityName: string) => {
      setSelectedPref('')
      setSelectedCity('')
      setSelectedDigits3('')

      const cityNameWithPref = `${prefName}${cityName}`
      activateByMAKeys(getMAKeysFromFilter('city', cityNameWithPref))
      activatePrefKeys([])
      activateCityKeys([cityNameWithPref])
    },
    [activateByMAKeys, activatePrefKeys, activateCityKeys],
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
      const feature = event.features?.[0] as MapGeoJSONFeature | undefined

      if (feature?.source === 'city-label-source' && feature.properties) {
        const properties = feature.properties as Record<string, string>
        const prefName = properties['PREF_NAME']
        const cityName = properties['CITY_NAME']

        if (prefName && cityName) {
          handleCityLabelClick(prefName, cityName)
        }
        return
      }

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

      activatePrefKeys([])
      activateCityKeys([])

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
    [
      maGeoData.features,
      activatePrefKeys,
      activateCityKeys,
      handleCityLabelClick,
    ],
  )

  const onHover = useCallback(
    (event: MapLayerMouseEvent) => {
      mapRef.current = event.target
      const feature = event.features?.[0] as MapGeoJSONFeature | undefined
      const sourceId = feature?.source as HoverState['sourceId'] | undefined
      const nextHoverId = feature?.id

      if (sourceId !== 'ma-source' && sourceId !== 'digits2-source') {
        clearHoverState()
        return
      }

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

      activateByMAKeys(getMAKeysFromFilter('pref', pref))
      activatePrefKeys([pref])
      activateCityKeys([])
    },
    [activateByMAKeys, activatePrefKeys, activateCityKeys],
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

      activateByMAKeys(getMAKeysFromFilter('city', cityName))
      activatePrefKeys([])
      activateCityKeys([cityName])
    },
    [activateByMAKeys, activatePrefKeys, activateCityKeys],
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

      activateByMAKeys(getMAKeysFromFilter('code_prefix', `${digits3}`))
      activatePrefKeys([])
      activateCityKeys([])
    },
    [activateByMAKeys, activatePrefKeys, activateCityKeys],
  )

  const activeMAFeatureCollection = useMemo(
    () => toFeatureCollection(activeMAs),
    [activeMAs],
  )

  const activePrefFeatureCollection = useMemo(
    () => toFeatureCollection(activePrefs),
    [activePrefs],
  )

  const activeCityFeatureCollection = useMemo(
    () => toFeatureCollection(activeCities),
    [activeCities],
  )

  const interactiveLayerIds = [
    ...(showMA ? ['ma-fills'] : []),
    ...(showDigits2 ? ['digits2-fills'] : []),
    ...(showCity ? ['city-labels'] : []),
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
          <label className="map-layer-toggle-item">
            <input
              type="checkbox"
              checked={showPref}
              onChange={(event) => setShowPref(event.target.checked)}
            />{' '}
            都道府県地図
          </label>
          <label className="map-layer-toggle-item">
            <input
              type="checkbox"
              checked={showCity}
              onChange={(event) => setShowCity(event.target.checked)}
            />{' '}
            市区町村地図
          </label>
        </div>

        <MapView
          mapLib={import('maplibre-gl')}
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
            prefGeoData={prefGeoData}
            cityGeoData={cityGeoData}
            activeMAFeatureCollection={activeMAFeatureCollection}
            activePrefFeatureCollection={activePrefFeatureCollection}
            activeCityFeatureCollection={activeCityFeatureCollection}
            showMA={showMA}
            showDigits2={showDigits2}
            showPref={showPref}
            showCity={showCity}
            zoom={mapZoom}
            onPrefLabelClick={handlePrefSelect}
            onDigits2LabelClick={handleDigits3Select}
          />
        </MapView>
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
