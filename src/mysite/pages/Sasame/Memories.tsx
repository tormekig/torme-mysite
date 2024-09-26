import React from 'react'

import { Header } from 'mysite/components/Header'

import sasame from '../../css/sasame.module.scss'

interface MemoryInfo {
  className: string
  textmain: string
  textsub: string
  triptime: string
  triplocation: string
  imgs: string[]
}

const data: MemoryInfo[] = [
  {
    className: sasame.kozushima2307,
    textmain: '神津島',
    textsub: '旅行',
    triptime: '2023/7/15～17',
    triplocation: '東京都神津島村',
    imgs: ['img/230717.jpg', 'img/230724.jpg', 'img/230727.jpg'],
  },
  {
    className: sasame.inage2306,
    textmain: '稲毛海岸',
    textsub: 'ロケ撮影',
    triptime: '2023/6/10',
    triplocation: '千葉県千葉市',
    imgs: [
      'img/230613.jpg',
      'img/230801.jpg',
      'img/230613.jpg',
      'img/230801.jpg',
    ],
  },
]

function Memory({ data }: { data: MemoryInfo }) {
  return (
    <div className={`${sasame.tripContent} ${data.className}`}>
      <div className={sasame.tripContentInner}>
        <div className={sasame.tripHeader}>
          <div className={sasame.tripHeaderTop}>
            <div className={sasame.tripHeaderTextMain}>{data.textmain}</div>
            <div className={sasame.tripHeaderTextSub}>{data.textsub}</div>
          </div>
          <div className={sasame.tripHeaderBottom}>
            <div>{data.triptime}</div>
            <div>{data.triplocation}</div>
          </div>
        </div>
        <div className={sasame.tripMain}>
          <div className={sasame.tripMainImgContainer}>
            <ul className={`${sasame.slider}`}>
              {data.imgs.map((img, i) => {
                return (
                  <li className={sasame.hoverImgContainer} key={i}>
                    <a
                      href={img}
                      data-lightbox={data.className}
                      data-title="キャプション"
                    >
                      <img src={img} alt="" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Memories() {
  return (
    <div>
      <Header ja={'思い出'} en={'Memories'} />
      {data.map((d, i) => {
        return <Memory data={d} key={i} />
      })}
    </div>
  )
}
