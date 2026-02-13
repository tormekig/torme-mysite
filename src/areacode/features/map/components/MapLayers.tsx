import React from 'react'
import { Layer, Source } from 'react-map-gl/maplibre'
import type { FeatureCollection, Geometry } from 'geojson'
import {
  activeMABorderStyle,
  activeMAFillStyle,
  digits2BorderStyle,
  digits2LabelStyle,
  maBorderStyle,
  maFillStyle,
  maLabelStyle,
} from '../mapStyles'

export function MapLayers({
  maGeoData,
  digits2GeoData,
  activeMAFeatureCollection,
  showMA,
  showDigits2,
}: {
  maGeoData: FeatureCollection<Geometry>
  digits2GeoData: FeatureCollection<Geometry>
  activeMAFeatureCollection: FeatureCollection<Geometry>
  showMA: boolean
  showDigits2: boolean
}) {
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
          <Layer
            {...digits2LabelStyle}
            layout={{
              ...digits2LabelStyle.layout,
              visibility: showDigits2 ? 'visible' : 'none',
            }}
          ></Layer>
        </Source>
      )}

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
