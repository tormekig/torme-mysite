import React from 'react'

import mysite from '../../assets/css/mysite.module.scss'
import { ScrollTop } from '../../../utils/tools'
import { Content } from './Content'
import { Personality } from './Personality'
import { HowToTakePictures } from './HowToTakePictures'
import { Memories } from './Memories'
import { Footer } from 'mysite/components/Footer'

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
        <Footer />
      </div>
    </div>
  )
}
