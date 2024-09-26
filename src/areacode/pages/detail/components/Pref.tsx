import React from 'react'
import MAList from '../../../assets/css/MAList.module.scss'

export function Pref({ pref }: { pref: string; className?: string }) {
  return (
    <div className={MAList.pref}>
      <p>{pref}</p>
    </div>
  )
}
