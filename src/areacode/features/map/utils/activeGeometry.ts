import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { ActiveGeometryInfo } from '../types'

export function buildActiveGeometryList(
  features: Feature<Geometry>[],
  predicate: (properties: Record<string, string>) => boolean,
): ActiveGeometryInfo[] {
  const matchedFeatures: Array<ActiveGeometryInfo | null> = features.map(
    (feature, index) => {
      const properties = (feature.properties ?? {}) as Record<string, string>
      if (!feature.geometry || !predicate(properties)) {
        return null
      }

      const featureId: ActiveGeometryInfo['featureId'] = index
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
    },
  )

  return matchedFeatures.filter(
    (item): item is ActiveGeometryInfo => item !== null,
  )
}

export function toFeatureCollection(
  activeFeatures: ActiveGeometryInfo[],
): FeatureCollection<Geometry> {
  return {
    type: 'FeatureCollection',
    features: activeFeatures.map((activeFeature) => activeFeature.feature),
  }
}
