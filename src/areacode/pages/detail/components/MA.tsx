import React from 'react'
import MAList from '../../../assets/css/MAList.module.scss'

export function MA({ ma }: { ma: string; className?: string }) {
  return (
    <div className={MAList.ma}>
      <p>{ma}</p>
    </div>
  )
}
