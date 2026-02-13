import React, { useMemo } from 'react'
import { Layer, Marker, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, Geometry, Position } from 'geojson'
import {
  activeMABorderStyle,
  activeMAFillStyle,
  digits2BorderStyle,
  maBorderStyle,
  maFillStyle,
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


type LabelMarker = {
  id: string
  position: Position
}

function reduceLabelOverlap<T extends LabelMarker>(
  markers: T[],
  cellSize: number,
  maxCount: number,
): T[] {
  if (markers.length <= 1) {
    return markers
  }

  const picked: T[] = []
  const usedCells = new Set<string>()

  for (const marker of markers) {
    const [lng, lat] = marker.position
    const cellLng = Math.floor(lng / cellSize)
    const cellLat = Math.floor(lat / cellSize)
    const key = `${cellLng}:${cellLat}`

    if (usedCells.has(key)) {
      continue
    }

    usedCells.add(key)
    picked.push(marker)

    if (picked.length >= maxCount) {
      break
    }
  }

  return picked
}

export function MapLayers({
  maGeoData,
  digits2GeoData,
  activeMAFeatureCollection,
  showMA,
  showDigits2,
  zoom,
}: {
  maGeoData: FeatureCollection<Geometry>
  digits2GeoData: FeatureCollection<Geometry>
  activeMAFeatureCollection: FeatureCollection<Geometry>
  showMA: boolean
  showDigits2: boolean
  zoom: number
}) {
  const rawMALabelMarkers = useMemo(
    () =>
      maGeoData.features
        .map((feature, index) => {
          if (!feature.geometry) {
            return null
          }
          const position = getLabelPosition(feature.geometry)
          const properties = (feature.properties ?? {}) as Record<string, string>
          if (!position) {
            return null
          }

          return {
            id: String(feature.id ?? `ma-${index}`),
            position,
            areaCode: `0${properties['_市外局番'] ?? ''}`,
            maName: properties['_MA名'] ?? '',
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [maGeoData.features],
  )

  const rawDigits2LabelMarkers = useMemo(
    () =>
      digits2GeoData.features
        .map((feature, index) => {
          if (!feature.geometry) {
            return null
          }
          const position = getLabelPosition(feature.geometry)
          const properties = (feature.properties ?? {}) as Record<string, string>
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


  const maLabelMarkers = useMemo(() => {
    const cellSize = zoom < 6 ? 1.4 : zoom < 7 ? 1.0 : zoom < 8 ? 0.72 : 0.5
    const maxCount = zoom < 6 ? 45 : zoom < 7 ? 90 : zoom < 8 ? 150 : 260

    return reduceLabelOverlap(rawMALabelMarkers, cellSize, maxCount)
  }, [rawMALabelMarkers, zoom])

  const digits2LabelMarkers = useMemo(() => {
    const cellSize = zoom < 6 ? 2.0 : zoom < 7 ? 1.4 : zoom < 8 ? 1.0 : 0.7
    const maxCount = zoom < 6 ? 24 : zoom < 7 ? 40 : zoom < 8 ? 72 : 120

    return reduceLabelOverlap(rawDigits2LabelMarkers, cellSize, maxCount)
  }, [rawDigits2LabelMarkers, zoom])

  return (
    <>
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
        </Source>
      )}

      {showMA &&
        maLabelMarkers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position[0]}
            latitude={marker.position[1]}
            anchor="center"
          >
            <div className="ma-map-label-marker">
              <div className="ma-map-label-code">{marker.areaCode}</div>
              <div className="ma-map-label-name">{marker.maName}</div>
            </div>
          </Marker>
        ))}

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
            <div className="digits2-map-label-marker">{marker.label}</div>
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
    </>
  )
}
