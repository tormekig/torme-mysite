import { useEffect, useState } from 'react'
import * as topojson from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import { getColorStyleByAreaCode } from 'areacode/components'
import { EMPTY_FEATURE_COLLECTION } from '../types'

const DEFAULT_FILL_COLOR = '#9ca3af'

function getFillColor(properties: Record<string, string>): string {
  const areaCode = properties['_市外局番'] ?? properties['市外局番2桁']
  if (!areaCode || !/^\d{1,4}$/.test(areaCode)) {
    return DEFAULT_FILL_COLOR
  }

  return getColorStyleByAreaCode(`0${areaCode}`).background.backgroundColor
}

function getMapAssetUrl(filename: string): string {
  const base = (process.env.PUBLIC_URL ?? '').replace(/\/$/, '')
  return `${base}/map/${filename}`
}

async function fetchTopoJson(url: string, objectKey: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `[MapData] Fetch failed: url=${url}, status=${response.status}, statusText=${response.statusText}`,
    )
  }

  const contentType = response.headers.get('content-type') ?? 'unknown'
  const topoData = await response.json()

  if (!topoData?.objects || !topoData.objects[objectKey]) {
    throw new Error(
      `[MapData] Invalid TopoJSON: url=${url}, objectKey=${objectKey}, contentType=${contentType}, availableObjects=${Object.keys(
        topoData?.objects ?? {},
      ).join(',')}`,
    )
  }

  return topoData
}

function normalizeGeoJsonFeatures(
  geojson: FeatureCollection<Geometry>,
): FeatureCollection<Geometry> {
  return {
    ...geojson,
    features: geojson.features.map((feature, index) => {
      const properties = (feature.properties ?? {}) as Record<string, string>

      return {
        ...feature,
        id: feature.id ?? index,
        properties: {
          ...properties,
          fillColor: getFillColor(properties),
        },
      }
    }),
  }
}

export function useMapGeoData() {
  const [maGeoData, setMaGeoData] = useState<FeatureCollection<Geometry>>(
    EMPTY_FEATURE_COLLECTION,
  )
  const [digits2GeoData, setDigits2GeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)

  useEffect(() => {
    const url = getMapAssetUrl('areacode.json')

    fetchTopoJson(url, 'areacode')
      .then((topoData) => {
        const rawGeojson = topojson.feature(
          topoData,
          topoData.objects.areacode,
        ) as unknown as FeatureCollection<Geometry>
        const geojson = normalizeGeoJsonFeatures(rawGeojson)
        setMaGeoData(geojson)
      })
      .catch((error) => {
        console.error('[MapData] Failed to load MA data', { url, error })
      })
  }, [])

  useEffect(() => {
    const url = getMapAssetUrl('digits2.json')

    fetchTopoJson(url, '2digits')
      .then((topoData) => {
        const rawGeojson = topojson.feature(
          topoData,
          topoData.objects['2digits'],
        ) as unknown as FeatureCollection<Geometry>
        const geojson = normalizeGeoJsonFeatures(rawGeojson)
        setDigits2GeoData(geojson)
      })
      .catch((error) => {
        console.error('[MapData] Failed to load 2-digits data', { url, error })
      })
  }, [])

  return {
    maGeoData,
    digits2GeoData,
  }
}
