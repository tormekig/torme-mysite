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

  // If the file is already GeoJSON FeatureCollection, return it as-is.
  if (topoData?.type === 'FeatureCollection') {
    return topoData
  }

  // If it's TopoJSON and contains the desired object, return it.
  if (topoData?.objects && topoData.objects[objectKey]) {
    return topoData
  }

  // If it's TopoJSON but the expected objectKey is missing, try to
  // gracefully fall back to the first available object.
  if (topoData?.objects) {
    const available = Object.keys(topoData.objects)
    if (available.length > 0) {
      console.warn(
        `[MapData] objectKey ${objectKey} not found in TopoJSON; falling back to ${available[0]} for url=${url}`,
      )
      return topoData
    }
  }

  throw new Error(
    `[MapData] Invalid TopoJSON/GeoJSON: url=${url}, objectKey=${objectKey}, contentType=${contentType}, availableObjects=${Object.keys(
      topoData?.objects ?? {},
    ).join(',')}`,
  )
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
      // If the response is already a GeoJSON FeatureCollection, use it.
      if (topoData?.type === 'FeatureCollection') {
        return normalizeGeoJsonFeatures(topoData as FeatureCollection<Geometry>)
      }

      // If the response is TopoJSON, try to extract the requested object.
      const targetObject = topoData.objects?.[objectKey] ??
        // fallback to first available object
        (topoData.objects ? topoData.objects[Object.keys(topoData.objects)[0]] : undefined)

      if (!targetObject) {
        throw new Error(`No suitable object found in TopoJSON: ${filename}`)
      }

      const rawGeojson = topojson.feature(topoData, targetObject) as unknown as FeatureCollection<Geometry>
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
