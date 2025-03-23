import React from 'react'
import { ColorStyle } from 'areacode/components'

import MAList from '../../../assets/css/MAList.module.scss'

export function AreaCode({
  areaCode,
  colorStyle,
}: {
  areaCode: string
  colorStyle?: ColorStyle
}) {
  return (
    <div style={colorStyle?.background} className={MAList.areacode}>
      <p>{areaCode}</p>
    </div>
  )
}
