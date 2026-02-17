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

function loadGeoData(
  filename: string,
  objectKey: string,
) {
  return fetchTopoJson(getMapAssetUrl(filename), objectKey)
    .then((topoData) => {
      const rawGeojson = topojson.feature(
        topoData,
        topoData.objects[objectKey],
      ) as unknown as FeatureCollection<Geometry>
      return normalizeGeoJsonFeatures(rawGeojson)
    })
    .catch((error) => {
      console.error(`[MapData] Failed to load ${filename} data`, {
        filename,
        error,
      })
      return EMPTY_FEATURE_COLLECTION
    })
}

export function useMapGeoData() {
  const [maGeoData, setMaGeoData] = useState<FeatureCollection<Geometry>>(
    EMPTY_FEATURE_COLLECTION,
  )
  const [digits2GeoData, setDigits2GeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)
  const [prefGeoData, setPrefGeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)
  const [cityGeoData, setCityGeoData] = useState<
    FeatureCollection<Geometry>
  >(EMPTY_FEATURE_COLLECTION)

  useEffect(() => {
    loadGeoData('ma.json', 'ma').then(setMaGeoData)
  }, [])

  useEffect(() => {
    loadGeoData('digits2.json', 'digits2').then(setDigits2GeoData)
  }, [])

  useEffect(() => {
    loadGeoData('pref.json', 'pref').then(setPrefGeoData)
  }, [])

  useEffect(() => {
    loadGeoData('city.json', 'city').then(setCityGeoData)
  }, [])

  return {
    maGeoData,
    digits2GeoData,
    prefGeoData,
    cityGeoData,
  }
}
