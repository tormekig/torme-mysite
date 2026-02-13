import React, { useMemo } from 'react'
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
}: {
  activeMAs: ActiveMAInfo[]
  isExpanded: boolean
  onToggleExpand: () => void
}) {
  const MAComps = useMemo(
    () =>
      activeMAs.flatMap((activeMA) =>
        new MACompListContent().filter('MA', activeMA.properties['_MA名']).MAComps,
      ),
    [activeMAs],
  )

  return (
    <div className={`active-ma-panel ${isExpanded ? 'expanded' : ''}`}>
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
      {MAComps.length > 0 && (
        <MAAreaCodeInfoCards
          MAComps={MAComps}
          displayParam={mapCardDisplayParam}
          cityOptions={cityOptions}
        />
      )}
    </div>
  )
}
