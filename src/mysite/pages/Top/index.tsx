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
import { Tips } from './tips'
import { Link } from 'react-router-dom'

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

        <div className={mysite.blogLink}>
          <Link
            to={'/blog'}
            style={{
              backgroundImage: `url("${convertPathToS3('img/memory/2405バガテル公園/IMG_0682.jpeg')}")`,
            }}
            className={mysite.blogLinkContainer}
          >
            <div className={mysite.blogLinkCover}>
              <p className={mysite.blogLinkTitle}>Torme's Blog</p>
            </div>
          </Link>
        </div>

        <Tips />

        <Footer />
      </main>
    </div>
  )
}

export default Top
