import React, { useCallback, useMemo, useRef, useState } from 'react'
import Map from 'react-map-gl/maplibre'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { MapLayerMouseEvent, Map as MapLibreMap } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './map.css'
import { MA_MAP_STYLE } from './mapStyles'
import { useMapGeoData } from './hooks/useMapGeoData'
import type { ActiveMAInfo, HoverState } from './types'
import { MapLayers } from './components/MapLayers'
import { ActiveMAPanel } from './components/ActiveMAPanel'

function App() {
  const { maGeoData, digits2GeoData } = useMapGeoData()
  const [showMA, setShowMA] = useState(true)
  const [showDigits2, setShowDigits2] = useState(true)
  const [activeMAs, setActiveMAs] = useState<ActiveMAInfo[]>([])
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)

  const mapRef = useRef<MapLibreMap | null>(null)
  const hoverRef = useRef<HoverState | null>(null)

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

    const featureId = feature.id
    const sourceFeature =
      typeof featureId === 'number' ? maGeoData.features[featureId] : undefined

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
  }, [maGeoData.features])

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
          // Prefer local browser fonts for symbol labels so Roboto/Noto Sans JP
          // can be reflected even when the base OSM style defines another stack.
          localFontFamily="Roboto, 'Noto Sans JP', sans-serif"
          onClick={onClick}
          onMouseMove={onHover}
          onMouseLeave={clearHoverState}
          interactiveLayerIds={interactiveLayerIds}
        >
          <MapLayers
            maGeoData={maGeoData}
            digits2GeoData={digits2GeoData}
            activeMAFeatureCollection={activeMAFeatureCollection}
            showMA={showMA}
            showDigits2={showDigits2}
          />
        </Map>
      </div>

      <ActiveMAPanel
        activeMAs={activeMAs}
        isExpanded={isPanelExpanded}
        onToggleExpand={() => setIsPanelExpanded((prev) => !prev)}
      />
    </div>
  )
}

export default App
