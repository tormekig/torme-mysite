import React, { useMemo } from 'react'
import { Layer, Marker, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, Geometry, Position } from 'geojson'
import {
  activeCityBorderStyle,
  activeMABorderStyle,
  activeMAFillStyle,
  activePrefBorderStyle,
  digits2BorderStyle,
  maBorderStyle,
  maFillStyle,
  maLabelStyle,
} from '../mapStyles'

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

function getDigits2FontSize(zoom: number): number {
  const minZoom = 5
  const maxZoom = 8
  const minSize = 18
  const maxSize = 34

  const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoom))
  const ratio = (clampedZoom - minZoom) / (maxZoom - minZoom)

  return minSize + (maxSize - minSize) * ratio
}

function isOverlappingWithDigits2(
  prefPosition: Position,
  digits2Markers: Array<{ position: Position }>,
): boolean {
  return digits2Markers.some((marker) => {
    const lngDiff = prefPosition[0] - marker.position[0]
    const latDiff = prefPosition[1] - marker.position[1]
    const latRad = (prefPosition[1] * Math.PI) / 180
    const adjustedLngDiff = lngDiff * Math.cos(latRad)
    const distance = Math.hypot(adjustedLngDiff, latDiff)

    return distance < 0.18
  })
}

function getLabelPosition(geometry: Geometry): Position | null {
  const points = flattenCoordinates(geometry)
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

  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2]
}

export function MapLayers({
  maGeoData,
  digits2GeoData,
  prefGeoData,
  cityGeoData,
  activeMAFeatureCollection,
  activePrefFeatureCollection,
  activeCityFeatureCollection,
  showMA,
  showDigits2,
  showPref,
  showCity,
  zoom,
  onPrefLabelClick,
  onDigits2LabelClick,
}: {
  maGeoData: FeatureCollection<Geometry>
  digits2GeoData: FeatureCollection<Geometry>
  prefGeoData: FeatureCollection<Geometry>
  cityGeoData: FeatureCollection<Geometry>
  activeMAFeatureCollection: FeatureCollection<Geometry>
  activePrefFeatureCollection: FeatureCollection<Geometry>
  activeCityFeatureCollection: FeatureCollection<Geometry>
  showMA: boolean
  showDigits2: boolean
  showPref: boolean
  showCity: boolean
  zoom: number
  onPrefLabelClick: (prefName: string) => void
  onDigits2LabelClick: (digits2: string) => void
}) {
  const digits2LabelMarkers = useMemo(
    () =>
      digits2GeoData.features
        .map((feature, index) => {
          if (!feature.geometry) {
            return null
          }
          const position = getLabelPosition(feature.geometry)
          const properties = (feature.properties ?? {}) as Record<
            string,
            string
          >
          if (!position) {
            return null
          }

          return {
            id: String(feature.id ?? `digits2-${index}`),
            position,
            label: properties['市外局番2桁'] ?? '',
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [digits2GeoData.features],
  )

  const digits2FontSize = useMemo(() => getDigits2FontSize(zoom), [zoom])

  const prefLabelMarkers = useMemo(
    () =>
      prefGeoData.features
        .map((feature, index) => {
          if (!feature.geometry) {
            return null
          }
          const position = getLabelPosition(feature.geometry)
          const properties = (feature.properties ?? {}) as Record<
            string,
            string
          >
          if (!position || !properties['PREF_NAME']) {
            return null
          }

          return {
            id: String(feature.id ?? `pref-${index}`),
            position,
            label: properties['PREF_NAME'],
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .filter(
          (marker) =>
            !showDigits2 ||
            !isOverlappingWithDigits2(marker.position, digits2LabelMarkers),
        ),
    [prefGeoData.features, digits2LabelMarkers, showDigits2],
  )

  return (
    <>
      {prefGeoData && (
        <Source id="pref-source" type="geojson" data={prefGeoData}>
          <Layer
            id="pref-border"
            type="line"
            paint={{
              'line-color': '#888',
              'line-width': 1,
            }}
            layout={{ visibility: showPref ? 'visible' : 'none' }}
          ></Layer>
        </Source>
      )}

      {showPref &&
        prefLabelMarkers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position[0]}
            latitude={marker.position[1]}
            anchor="center"
          >
            <button
              type="button"
              className="pref-map-label-marker"
              onClick={() => onPrefLabelClick(marker.label)}
            >
              {marker.label}
            </button>
          </Marker>
        ))}

      {cityGeoData && (
        <Source id="city-source" type="geojson" data={cityGeoData}>
          <Layer
            id="city-border"
            type="line"
            paint={{
              'line-color': '#888',
              'line-width': 1,
            }}
            layout={{ visibility: showCity ? 'visible' : 'none' }}
          ></Layer>
          <Layer
            id="city-label"
            type="symbol"
            layout={{
              'text-field': ['get', 'CITY_NAME'],
              'text-size': 12,
              'text-anchor': 'center',
              visibility: showCity ? 'visible' : 'none',
            }}
            paint={{
              'text-color': '#555',
            }}
          ></Layer>
        </Source>
      )}

      {maGeoData && (
        <Source id="ma-source" type="geojson" data={maGeoData}>
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
        <Source id="digits2-source" type="geojson" data={digits2GeoData}>
          <Layer
            {...digits2BorderStyle}
            layout={{ visibility: showDigits2 ? 'visible' : 'none' }}
          ></Layer>
        </Source>
      )}

      {showDigits2 &&
        digits2LabelMarkers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position[0]}
            latitude={marker.position[1]}
            anchor="center"
          >
            <button
              type="button"
              className="digits2-map-label-marker"
              style={{ fontSize: `${digits2FontSize}px` }}
              onClick={() => onDigits2LabelClick(marker.label)}
            >
              {marker.label}
            </button>
          </Marker>
        ))}

      <Source
        id="active-ma-source"
        type="geojson"
        data={activeMAFeatureCollection}
      >
        <Layer
          {...activeMAFillStyle}
          layout={{ visibility: showMA ? 'visible' : 'none' }}
        ></Layer>
        <Layer
          {...activeMABorderStyle}
          layout={{ visibility: showMA ? 'visible' : 'none' }}
        ></Layer>
      </Source>

      <Source
        id="active-pref-source"
        type="geojson"
        data={activePrefFeatureCollection}
      >
        <Layer
          {...activePrefBorderStyle}
          layout={{ visibility: showPref ? 'visible' : 'none' }}
        ></Layer>
      </Source>

      <Source
        id="active-city-source"
        type="geojson"
        data={activeCityFeatureCollection}
      >
        <Layer
          {...activeCityBorderStyle}
          layout={{ visibility: showCity ? 'visible' : 'none' }}
        ></Layer>
      </Source>
    </>
  )
}
