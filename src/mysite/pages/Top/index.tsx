import React from 'react';

import { Link } from 'react-router-dom';
import mysite from 'mysite/css/mysite.module.scss';
import { motion } from 'framer-motion';
import { ScrollTop } from '../../../utils/tools';
import { Content as SasameContent } from '../Sasame/Content';
import { Content as EmuContent } from '../Emu/Content';
import { Header } from '../../components/Header';
import { TopContent } from './TopContent';
import { TormeContent } from './Content';
import { Gallery } from './Gallery';
import { SocialMedia } from './SocialMedia';

const Top = () => {

  return (
    <div className={mysite.mysiteBody}>
    <ScrollTop />
    <main>
      <div id="loading">
        <div id="loading-logo">
          <div className="fadeUp">Torme kig</div>
        </div>
      </div>

      <TopContent/>
      <TormeContent/>

      <div>
        <Header ja={"キャラクター紹介"} en={"Characters"} />
        <SasameContent/>
        <EmuContent/>
      </div>

      <Gallery/>

      <div className={mysite.dotContent} style={{backgroundImage: `url("./img/221029.jpg")`}}>
        <div className={mysite.dotContentInner}>
          <motion.div className={mysite.dotContentContent}
            initial={{ transform: "scale(1.2)", opacity: 0 }}
            whileInView={{ transform: "scale(1.0)", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1.0 }}
          >
            <div>ささめのことをもっと知りたい方はこちら</div>
            <div className={mysite.dotContentContentAOuter}>
              <Link to={`/sasame`}>ささめの部屋</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <SocialMedia/>

      <footer id={mysite.footerContainer}>
        <div className={mysite.footer}>
          <small>copyright 2023 torme_kig All rights reserved.</small>
        </div>
      </footer>
    </main>
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossOrigin="anonymous"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox.min.js"></script>
    <script src="./lib/index.js"></script>
    <script src="splash.js"></script>
    </div>
  )
};

export default Top;