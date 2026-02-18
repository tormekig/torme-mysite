import React, { useMemo } from 'react'
import { Layer, Marker, Source } from 'react-map-gl/maplibre'
import type { Feature, FeatureCollection, Geometry, Point, Position } from 'geojson'
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
import { getLabelPosition } from '../utils/geometry'

const CITY_LABEL_MIN_ZOOM = 8.3
const CITY_LABEL_MAX_COLLISION_ZOOM = 12

function getDigits2FontSize(zoom: number): number {
  const minZoom = 5
  const maxZoom = 8
  const minSize = 18
  const maxSize = 34

  const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoom))
  const ratio = (clampedZoom - minZoom) / (maxZoom - minZoom)

  return minSize + (maxSize - minSize) * ratio
}

function getDistance(a: Position, b: Position): number {
  const lngDiff = a[0] - b[0]
  const latDiff = a[1] - b[1]
  const latRad = (a[1] * Math.PI) / 180
  const adjustedLngDiff = lngDiff * Math.cos(latRad)

  return Math.hypot(adjustedLngDiff, latDiff)
}

function hasCollision(
  position: Position,
  targets: Array<{ position: Position }>,
  threshold: number,
): boolean {
  return targets.some(
    (target) => getDistance(position, target.position) < threshold,
  )
}

function getAdjustedPrefPosition(
  basePosition: Position,
  digits2Markers: Array<{ position: Position }>,
  placedPrefMarkers: Array<{ position: Position }>,
): Position {
  const offsets: Array<[number, number]> = [
    [0, 0],
    [0, 0.22],
    [0.22, 0],
    [0, -0.22],
    [-0.22, 0],
    [0.16, 0.16],
    [0.16, -0.16],
    [-0.16, 0.16],
    [-0.16, -0.16],
    [0, 0.34],
    [0.34, 0],
    [0, -0.34],
    [-0.34, 0],
  ]

  for (const [offsetLng, offsetLat] of offsets) {
    const candidate: Position = [
      basePosition[0] + offsetLng,
      basePosition[1] + offsetLat,
    ]

    const overlapsDigits2 = hasCollision(candidate, digits2Markers, 0.16)
    const overlapsPref = hasCollision(candidate, placedPrefMarkers, 0.12)
    if (!overlapsDigits2 && !overlapsPref) {
      return candidate
    }
  }

  return basePosition
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

  const prefLabelMarkers = useMemo(() => {
    const placedPrefMarkers: Array<{
      id: string
      position: Position
      label: string
    }> = []

    prefGeoData.features.forEach((feature, index) => {
      if (!feature.geometry) {
        return
      }
      const position = getLabelPosition(feature.geometry)
      const properties = (feature.properties ?? {}) as Record<string, string>
      const label = properties['PREF_NAME']

      if (!position || !label) {
        return
      }

      const adjustedPosition = showDigits2
        ? getAdjustedPrefPosition(
            position,
            digits2LabelMarkers,
            placedPrefMarkers,
          )
        : position

      placedPrefMarkers.push({
        id: String(feature.id ?? `pref-${index}`),
        position: adjustedPosition,
        label,
      })
    })

    return placedPrefMarkers
  }, [prefGeoData.features, digits2LabelMarkers, showDigits2])

  const cityLabelGeoData = useMemo<FeatureCollection<Point>>(() => {
    const groupedByCity = new Map<
      string,
      {
        id: string
        prefName: string
        cityName: string
        candidates: Position[]
      }
    >()

    cityGeoData.features.forEach((feature, index) => {
      if (!feature.geometry) {
        return
      }

      const position = getLabelPosition(feature.geometry)
      const properties = (feature.properties ?? {}) as Record<string, string>
      const cityName = properties['CITY_NAME']
      const prefName = properties['PREF_NAME']

      if (!position || !cityName || !prefName) {
        return
      }

      const cityKey = `${prefName}|${cityName}`
      const existing = groupedByCity.get(cityKey)

      if (existing) {
        existing.candidates.push(position)
        return
      }

      groupedByCity.set(cityKey, {
        id: String(feature.id ?? `city-${index}`),
        prefName,
        cityName,
        candidates: [position],
      })
    })

    const features = Array.from(groupedByCity.values()).map((city) => {
      const averagedPosition: Position = city.candidates.reduce<Position>(
        (sum, candidate) => [sum[0] + candidate[0], sum[1] + candidate[1]],
        [0, 0],
      )
      const center: Position = [
        averagedPosition[0] / city.candidates.length,
        averagedPosition[1] / city.candidates.length,
      ]

      return {
        type: 'Feature',
        id: city.id,
        properties: {
          PREF_NAME: city.prefName,
          CITY_NAME: city.cityName,
        },
        geometry: {
          type: 'Point',
          coordinates: center,
        },
      } as Feature<Point>
    })

    return {
      type: 'FeatureCollection',
      features,
    }
  }, [cityGeoData.features])

  const shouldShowCityLabels = showCity && zoom >= CITY_LABEL_MIN_ZOOM
  const cityLabelAllowOverlap = zoom >= CITY_LABEL_MAX_COLLISION_ZOOM

  const cityLabelLayout = useMemo(() => {
    const textFieldExpression: ['get', string] = ['get', 'CITY_NAME']
    const textSizeExpression: [
      'interpolate',
      ['linear'],
      ['zoom'],
      number,
      number,
      number,
      number,
      number,
      number,
    ] = [
        'interpolate',
        ['linear'],
        ['zoom'],
        CITY_LABEL_MIN_ZOOM,
        10,
        10,
        11,
        12,
        12,
      ]

    return {
      'text-field': textFieldExpression,
      'text-size': textSizeExpression,
      'text-font': ['Roboto Bold', 'Noto Sans CJK JP Bold', 'sans-serif'],
      'text-anchor': 'center' as const,
      'text-allow-overlap': cityLabelAllowOverlap,
      'text-ignore-placement': cityLabelAllowOverlap,
      visibility: shouldShowCityLabels ? ('visible' as const) : ('none' as const),
    }
  }, [cityLabelAllowOverlap, shouldShowCityLabels])

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
              onClick={(event) => {
                event.stopPropagation()
                onPrefLabelClick(marker.label)
              }}
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
              onClick={(event) => {
                event.stopPropagation()
                onDigits2LabelClick(marker.label)
              }}
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

      <Source id="city-label-source" type="geojson" data={cityLabelGeoData}>
        <Layer
          id="city-labels"
          type="symbol"
          layout={cityLabelLayout}
          paint={{
            'text-color': '#065f46',
            'text-halo-color': 'rgba(236, 253, 245, 0.96)',
            'text-halo-width': 2,
            'text-halo-blur': 0.2,
          }}
        ></Layer>
      </Source>

      {maGeoData && (
        <Source id="ma-label-source" type="geojson" data={maGeoData}>
          <Layer
            id="ma-label-top"
            {...maLabelStyle}
            layout={{
              ...maLabelStyle.layout,
              visibility: showMA ? 'visible' : 'none',
            }}
          ></Layer>
        </Source>
      )}
    </>
  )
}
