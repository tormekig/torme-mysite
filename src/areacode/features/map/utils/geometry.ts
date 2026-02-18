import type { Feature, Geometry, Position, BBox } from 'geojson'

export function flattenCoordinates(geometry: Geometry): Position[] {
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

export function getFeaturesBounds(features: Feature<Geometry>[]): BBox | null {
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

export function getLabelPosition(geometry: Geometry): Position | null {
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
