import React from 'react'
import mysite from 'mysite/assets/css/mysite.module.scss'

export interface ImgMetaData {
  thumbnail?: string
  img?: string
  alt?: string
}

export function ImgModal({
  closeFunc,
  imgMetaData,
}: {
  closeFunc: () => void
  imgMetaData: ImgMetaData
}) {
  return (
    <div className={mysite.imgModal}>
      <div className={mysite.imgContainer}>
        <img src={imgMetaData.img} />
      </div>
      <p>{imgMetaData.alt}撮影：〇〇〇さん</p>
      {/* <div
        onClick={() => {
          closeFunc()
        }}
      >
        <span>閉じる</span>
      </div> */}
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
    <div className={mysite.imgModalThumbContainer}>
      <img
        src={imgMetaData.img}
        alt={imgMetaData.alt}
        onClick={() => {
          openModal(imgMetaData)
        }}
      />
    </div>
  )
}
