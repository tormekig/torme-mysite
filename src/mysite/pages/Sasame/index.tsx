import React from 'react'

import mysite from '../../assets/css/mysite.module.scss'
import { ScrollTop } from '../../../utils/tools'
import { Content } from './Content'
import { Personality } from './Personality'
import { HowToTakePictures } from './HowToTakePictures'
import { Memories } from './Memories'

export function Sasame() {
  return (
    <div className={mysite.mysiteBody}>
      <ScrollTop />
      <div id="splash">
        <div id="splash-logo">Sasame</div>
      </div>
      <div className="splashbg"></div>
      <div id="container">
        <Content />
        <Personality />
        <HowToTakePictures />
        <Memories />

        <footer id="footer-container">
          <div className="footer">
            <small>copyright 2023 torme_kig All rights reserved.</small>
          </div>
        </footer>
      </div>
      <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossOrigin="anonymous"
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
      {/* <script>
      const param = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6900,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: 'linear',
        slidesToShow: 2.5,
        slidesToScroll: 1,
        responsive: [
        {
          breakpoint: 769,
          settings: {
          slidesToShow: 2,
          }
        },
        {
          breakpoint: 426,
          settings: {
          slidesToShow: 1.5,
          }
        }
        ]
      }

      $('.slider').each((i, e) => {
        $(e).slick(param);
      })
      </script> */}
      <script src="splash.js"></script>
    </div>
  )
}
