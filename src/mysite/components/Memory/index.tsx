import React from 'react'

import { ContentHeader } from 'mysite/components/ContentHeader'

import sasame from '../../assets/css/sasame.module.scss'
import '@splidejs/react-splide/css'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { Character, data, MemoryInfo } from './data'
import { ImgMetaData, ImgModalThumb } from '../imgModal'

function Memory({
  data,
  openModal,
}: {
  data: MemoryInfo
  openModal: (imgMetaData: ImgMetaData) => void
}) {
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
            <div>
              {data.tags.map((tag, i) => {
                return <div key={i}>#{tag}</div>
              })}
            </div>
          </div>
        </div>
        <div className={sasame.tripMain}>
          <div className={sasame.tripMainImgContainer}>
            <Splide
              options={{
                gap: '1rem',
                type: 'loop',
                height: '512px',
                autoWidth: true,
                lazyLoad: 'nearby',
                autoScroll: {
                  speed: 1,
                },
                arrows: false,
                pagination: false,
                drag: false,
                breakpoints: {
                  1024: {
                    height: '256px',
                  },
                  600: {
                    height: '192px',
                  },
                },
              }}
              extensions={{ AutoScroll }}
              className={`${sasame.slider}`}
            >
              {data.imgs.map((img, i) => {
                return (
                  <SplideSlide key={i}>
                    <ImgModalThumb
                      imgMetaData={{ img }}
                      openModal={openModal}
                    />
                  </SplideSlide>
                )
              })}
            </Splide>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MemoryList({
  openModal,
  characters,
}: {
  openModal: (imgMetaData: ImgMetaData) => void
  characters: Character[]
}) {
  function isIncludeCharacters(memory: MemoryInfo) {
    let judge = false
    memory.characters.forEach((c) => {
      characters.forEach((c2) => {
        console.log(c, c2)
        if (c === c2) judge = true
      })
    })
    return judge
  }

  const d = data.filter((d) => isIncludeCharacters(d))
  console.log(d)
  return (
    <div>
      <ContentHeader ja={'思い出'} en={'Memories'} />
      {data
        .filter((d) => isIncludeCharacters(d))
        .map((d, i) => {
          return <Memory data={d} openModal={openModal} key={i} />
        })}
    </div>
  )
}
