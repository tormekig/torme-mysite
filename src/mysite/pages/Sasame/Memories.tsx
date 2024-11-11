import React from 'react'

import { ContentHeader } from 'mysite/components/ContentHeader'

import sasame from '../../assets/css/sasame.module.scss'
import '@splidejs/react-splide/css'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { data, MemoryInfo } from './MemoryData'

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
                drag: 'free',
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
                    <img src={img} alt="" />
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

export function Memories() {
  return (
    <div>
      <ContentHeader ja={'思い出'} en={'Memories'} />
      {data.map((d, i) => {
        return <Memory data={d} key={i} />
      })}
    </div>
  )
}
