import { useEffect, useState } from 'react'
import * as topojson from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import { getColorStyleByAreaCode } from 'areacode/components'
import { EMPTY_FEATURE_COLLECTION } from '../types'

const DEFAULT_FILL_COLOR = '#9ca3af'

function getFillColor(properties: Record<string, string>): string {
  const areaCode = properties['_市外局番'] ?? properties['市外局番2桁']
  if (!areaCode || !/^\d{1,3}$/.test(areaCode)) {
    return DEFAULT_FILL_COLOR
  }

  return getColorStyleByAreaCode(`0${areaCode}`).background.backgroundColor
}

export function useMapGeoData() {
  const [maGeoData, setMaGeoData] = useState<FeatureCollection<Geometry>>(
    EMPTY_FEATURE_COLLECTION,
  )
  const [digits2GeoData, setDigits2GeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)

  useEffect(() => {
    fetch('/map/areacode.json')
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
              fillColor: getFillColor(properties),
            },
          }
        })
        setMaGeoData(geojson)
      })
  }, [])

  useEffect(() => {
    fetch('/map/digits2.json')
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
              fillColor: getFillColor(properties),
            },
          }
        })
        setDigits2GeoData(geojson)
      })
  }, [])

  return {
    maGeoData,
    digits2GeoData,
  }
}
