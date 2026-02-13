import type {
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from 'maplibre-gl'

export const MA_MAP_STYLE =
  'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json'

const JAPANESE_LABEL_FONT_STACK = ['Roboto', 'Noto Sans JP', 'sans-serif'] as const

export const maFillStyle: FillLayerSpecification = {
  source: 'ma-source',
  id: 'ma-fills',
  type: 'fill',
  paint: {
    'fill-color': ['get', 'fillColor'],
    'fill-outline-color': ['get', 'fillColor'],
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      0.55,
      0.85,
    ],
  },
}

export const maBorderStyle: LineLayerSpecification = {
  source: 'ma-source',
  id: 'ma-borders',
  type: 'line',
  paint: {
    'line-color': '#1a1a1a',
    'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.4, 8, 1.2],
    'line-opacity': 0.7,
  },
}

export const activeMAFillStyle: FillLayerSpecification = {
  source: 'active-ma-source',
  id: 'active-ma-fills',
  type: 'fill',
  paint: {
    'fill-color': '#ef4444',
    'fill-opacity': 0.18,
  },
}

export const activeMABorderStyle: LineLayerSpecification = {
  source: 'active-ma-source',
  id: 'active-ma-borders',
  type: 'line',
  paint: {
    'line-color': '#dc2626',
    'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2.8, 8, 5.2],
    'line-opacity': 1,
  },
}

export const maLabelStyle: SymbolLayerSpecification = {
  source: 'ma-source',
  id: 'ma-labels',
  type: 'symbol',
  layout: {
    'text-field': [
      'concat',
      '0',
      ['coalesce', ['get', '_市外局番'], ''],
      '\n',
      ['coalesce', ['get', '_MA名'], ''],
    ],
    'text-size': ['interpolate', ['linear'], ['zoom'], 5, 11, 8, 14],
    'text-font': [...JAPANESE_LABEL_FONT_STACK],
    'text-anchor': 'center',
    'text-justify': 'center',
    'text-line-height': 1.15,
    'text-allow-overlap': false,
    'text-ignore-placement': false,
  },
  paint: {
    'text-color': '#111827',
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.1,
    'text-halo-blur': 0.2,
  },
}

export const digits2BorderStyle: LineLayerSpecification = {
  source: 'digits2-source',
  id: 'digits2-borders',
  type: 'line',
  paint: {
    'line-color': '#374151',
    'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 8, 2.0],
    'line-opacity': 0.85,
  },
}

export const digits2LabelStyle: SymbolLayerSpecification = {
  source: 'digits2-source',
  id: 'digits2-labels',
  type: 'symbol',
  layout: {
    'text-field': ['coalesce', ['get', '市外局番2桁'], ''],
    'text-size': ['interpolate', ['linear'], ['zoom'], 5, 20, 8, 30],
    'text-font': [...JAPANESE_LABEL_FONT_STACK],
    'text-allow-overlap': false,
    'text-ignore-placement': false,
  },
  paint: {
    'text-color': '#111827',
    'text-halo-color': '#ffffff',
    'text-halo-width': 1.3,
    'text-halo-blur': 0.2,
  },
}
