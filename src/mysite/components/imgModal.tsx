import React from 'react'
import mysite from 'mysite/assets/css/mysite.module.scss'
import { convertPathToS3 } from 'utils/tools'

export interface ImgMetaData {
  src: string
  alt?: string
}

export function ImgModal({ imgMetaData }: { imgMetaData: ImgMetaData }) {
  return (
    <div className={mysite.imgModal}>
      <div className={mysite.imgContainer}>
        <img src={convertPathToS3(imgMetaData.src)} />
      </div>
      <p>{imgMetaData.alt}</p>
    </div>
  )
}

export function ImgModalThumb({
  imgMetaData,
  openModal,
}: {
  imgMetaData: ImgMetaData
  openModal: (imgMetaData: ImgMetaData) => void
}) {
  return (
    <div
      className={mysite.imgModalThumbContainer}
      onClick={() => {
        openModal(imgMetaData)
      }}
    >
      <img src={convertPathToS3(imgMetaData.src, true)} />
    </div>
  )
}
