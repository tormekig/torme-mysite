import React from 'react'

import mysite from 'mysite/assets/css/mysite.module.scss'
import { convertPathToS3, ScrollTop } from '../../../utils/tools'
import { Content as SasameContent } from '../Sasame/Content'
import { Content as EmuContent } from '../Emu/Content'
import { ContentHeader } from '../../components/ContentHeader'
import { TopContent } from './TopContent'
import { TormeContent } from './Content'
import { SocialMedia } from './SocialMedia'
import { Footer } from 'mysite/components/Footer'
import { MoreDetailParallax } from './MoreDetailParallax'

const Top = () => {
  return (
    <div className={mysite.mysiteBody}>
      <ScrollTop />
      <main>
        {/* <div id="loading">
          <div id="loading-logo">
            <div className="fadeUp">Torme kig</div>
          </div>
        </div> */}

        <TopContent />
        <TormeContent />

        <div>
          <ContentHeader ja={'キャラクター紹介'} en={'Characters'} />

          <SasameContent />
          <MoreDetailParallax
            img={convertPathToS3('img/etc/221029.jpg')}
            name={'ささめ'}
            link={'/sasame'}
            className={mysite.dotContentSasameContentOuter}
          />

          <EmuContent />
          <MoreDetailParallax
            img={convertPathToS3('img/etc/EmuTable.JPG')}
            name={'えむ'}
            link={'/emu'}
            className={mysite.dotContentEmuContentOuter}
          />
        </div>

        <SocialMedia />

        <Footer />
      </main>
    </div>
  )
}

export default Top
