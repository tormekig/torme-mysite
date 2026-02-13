import React from 'react'
import { MACompListContent } from 'areacode/pages/list/MACompListContent'
import { MAAreaCodeInfoCards } from 'areacode/pages/list/components'
import type { ActiveMAInfo } from '../types'

const mapCardDisplayParam = [
  '市外局番',
  '番号領域',
  '都道府県',
  'MA名',
  '市区町村',
  '一部地域詳細表示',
]

const cityOptions = {
  areaDisplayFull: true,
  isQuiz: false,
}

export function ActiveMAPanel({
  activeMAs,
  isExpanded,
  onToggleExpand,
  onRemove,
}: {
  activeMAs: ActiveMAInfo[]
  isExpanded: boolean
  onToggleExpand: () => void
  onRemove: (featureId: string | number) => void
}) {
  return (
    <div
      className={`active-ma-panel ${isExpanded ? 'expanded' : ''}`}
    >
      <div className="active-ma-panel-header">
        <button
          type="button"
          className="active-ma-panel-toggle"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '情報パネルを縮小' : '情報パネルを拡大'}
        >
          <div className="active-ma-panel-grabber" />
        </button>
      </div>
      {activeMAs.length === 0 && (
        <p style={{ margin: 0, color: '#4b5563' }}>
          地図上のMAをクリックすると、ここに情報を表示します。
        </p>
      )}
      {activeMAs.map((activeMA) => {
        const { MAComps } = new MACompListContent().filter(
          'MA',
          activeMA.properties['_MA名'],
        )
        return (
          <div
            key={activeMA.featureId}
            style={{
              marginBottom: 12,
              padding: 10,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <strong>{activeMA.properties['_MA名']}</strong>
              <button
                type="button"
                onClick={() => {
                  onRemove(activeMA.featureId)
                }}
              >
                ×
              </button>
            </div>
            <MAAreaCodeInfoCards
              MAComps={MAComps}
              displayParam={mapCardDisplayParam}
              cityOptions={cityOptions}
            />
          </div>
        )
      })}
    </div>
  )
}
