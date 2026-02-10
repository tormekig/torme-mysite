import React from 'react'
import { ColorStyle, getColorStyleForQuiz } from 'areacode/components'

import MAList from '../../../assets/css/MAList.module.scss'
import quiz from 'areacode/assets/css/quiz.module.scss'

export function AreaCode({
  areaCode,
  colorStyle,
  isQuiz = false,
}: {
  areaCode: string
  colorStyle?: ColorStyle
  isQuiz?: boolean
}) {
  const className = isQuiz ? quiz.areacode : MAList.areacode
  colorStyle = isQuiz ? getColorStyleForQuiz() : colorStyle
  return (
    <div style={colorStyle?.background} className={className}>
      <p>{areaCode}</p>
    </div>
  )
}
