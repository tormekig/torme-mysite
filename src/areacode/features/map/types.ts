import type { Feature, FeatureCollection, Geometry } from 'geojson'

export type HoverState = {
  sourceId: 'ma-source' | 'digits2-source'
  featureId: string | number
}

export type ActiveMAInfo = {
  featureId: string | number
  properties: Record<string, string>
  feature: Feature<Geometry>
}

export const EMPTY_FEATURE_COLLECTION: FeatureCollection<Geometry> = {
  type: 'FeatureCollection',
  features: [],
}
