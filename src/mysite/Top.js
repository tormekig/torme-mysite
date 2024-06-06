import { Link } from 'react-router-dom';
import mysite from './css/mysite.module.scss';
import { SasameContent } from './sasame';
import { motion } from 'framer-motion';
import { Timeline } from 'react-twitter-widgets';
import { ScrollTop } from '../utils/tools';
import { EmuContent } from './emu';

function LinkButton() {

  const buttons = [];

  const links = [
    {
      url: "https://twitter.com/torme_kig",
      img: "img/logo/logo.svg",
      text: "@torme_kig"
    },
    {
      url: "https://twitter.com/torme_etc",
      img: "img/logo/logo.svg",
      text: "@torme_etc"
    },
    {
      url: "https://www.youtube.com/@torme_kig",
      img: "img/logo/youtube_white.png",
      text: "@torme_kig"
    },
    {
      url: "https://www.instagram.com/sasame0123/",
      img: "img/logo/Instagram_Glyph_White.svg",
      text: "@sasame0123"
    },
  ]

  links.forEach(function(link, i) {
    buttons.push(
      <li className={mysite.linkButton} key={i}>
        <a href={link.url} target="_blank">
          <div className={mysite.linkIcon}>
            <img src={link.img} />
          </div>
            <div className={mysite.linkText}>
            <div className={mysite.linkTextSub}>{link.text}</div>
          </div>
        </a>
      </li>
    )
  })

  return (
    <ul id={mysite.linkButtonContainer}>
      {buttons}
    </ul>
  )
}
function TopContent() {
  return (
    <div id={mysite.topContent}>
    <div id={mysite.centerBox}>
      <div id={mysite.topImgBackRect}></div>
      <div id={mysite.topLeftContent}>
        <motion.div
          initial={{ transform: "rotate(-5deg) scale(1.2)", opacity: 0 }}
          whileInView={{ transform: "rotate(-3deg) scale(1)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
          id={mysite.topImgContainer}
        >
          <img id={mysite.topImg} src="img\221023.jpg" />
        </motion.div>
      </div>
      <div id={mysite.topBox}>
        <h2 id={mysite.topName} className="bgextend bgLRextend">
          <span className="bgappearTrigger bgappear">Torme<span className={mysite.topNameBlue}> - kig</span></span>
        </h2>
        <LinkButton/>
      </div>
    </div>
    </div>
  )
}

function TormeContent() {
  return (
    <div id={mysite.tormeContent}>
      <div id={mysite.profileContent}>
        <motion.h2
          initial={{ transform: "translateY(-5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          Torme's Profile
        </motion.h2>
        <motion.div
          initial={{ transform: "translateX(-5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className={mysite.profileText}
        >
          <p>
            私に興味を持っていただいてありがとうございます。<br />
            とるめ と申します。
          </p>
          <p>
            美少女系をメインに、着ぐるみが好きなただの成人男性です。<br />
            変身願望を満たすために、極限まで自分と違う姿を目指せる着ぐるみに魅力を感じました。
          </p>
          <p>法やルールはしっかりと守り、趣味の活動を続けていく所存です。</p>
        </motion.div>
        <motion.table
          initial={{ transform: "translateX(5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className={mysite.profileTable}
        >
          <tbody>
            <tr>
              <th>場所</th>
              <td>神奈川県<br />以前は北海道にいました</td>
            </tr>
            <tr>
              <th>食</th>
              <td>
              美味しいもの好き<br />お酒も適度に飲みます。<br />ビールとか日本酒とか。
              </td>
            </tr>
            <tr>
              <th>旅行</th>
              <td>47都道府県全部行ったことあります<br />海外はまだ、、</td>
            </tr>
            <tr>
              <th>ゲーム</th>
              <td>プロセカにハマってます</td>
            </tr>
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}

export function Header({color, ja, en}) {
  return (
    <div className={`${mysite.headline} ${color}`}>
      <h1 className={mysite.headlineMain}>
        <motion.span
          initial={{ transform: "translateX(-50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          <motion.span
          initial={{ transform: "translateX(50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
            {en}
          </motion.span>
        </motion.span>
      </h1>
      <p className={mysite.headlineSub}>
        <motion.span
          initial={{ transform: "translateX(50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          <motion.span
            initial={{ transform: "translateX(-50%)", opacity: 0 }}
            whileInView={{ transform: "translateX(0%)", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
          >
            {ja}
          </motion.span>
        </motion.span>
      </p>
    </div>
  )
}

function Characters() {
  return (
    <div>
      <Header ja={"キャラクター紹介"} en={"Characters"} />
      <SasameContent/>
      <EmuContent/>
    </div>
  )
}

function Gallery() {

  const imgs = [
    {
      img: "img/220723.jpg"
    },
    {
      img: "img/220731.jpg"
    },
    {
      img: "img/221029.jpg"
    },
    {
      img: "img/221031.jpg"
    },
    {
      img: "img/221107.jpg"
    },
    {
      img: "img/220723.jpg"
    },
    {
      img: "img/220731.jpg"
    },
    {
      img: "img/221029.jpg"
    },
    {
      img: "img/221031.jpg"
    },
    {
      img: "img/221107.jpg"
    },
  ]

  const galleries = []

  imgs.forEach(function(img, i) {
    const caption = img.caption ? img.caption : "";
    galleries.push(
      <motion.li
        initial={{ transform: "rotateY(30deg)", opacity: 0 }}
        whileInView={{ transform: "rotateY(0deg)", opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        key={i}
      >
        <a href={img.img} data-lightbox="sasame-gallery" data-title={caption}>
          <img src={img.img} alt={img.caption} />
        </a>
      </motion.li>
    )
  })

  return (
    <div id={mysite.galleryContainer}>
      <ul id={mysite.gallery}>
        {galleries}
      </ul>
    </div>
  )
}

function SocialMedia() {
  return (
    <div>
      <Header color={mysite.headlineGreen} ja={"ソーシャルメディア"} en={"Social Media"} />
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.youtube}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>YouTube</div>
            <div className={mysite.socialMediaHeaderSub}>おすすめ動画</div>
          </div>
          <div>
            <div className={mysite.youtubeIframe}>
              <iframe width="100%" src="https://www.youtube.com/embed/mdYZVuJvwKg?si=keNIQPgkj67DzlKG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
          <div className={mysite.socialMediaTitle}>
            <a href="https://www.youtube.com/watch?v=mdYZVuJvwKg">
              【着ぐるみ】ささめのGeoGuessr実況【日本版 #1】
            </a>
          </div>
          <div className={mysite.socialMediaFooter}>
            <a href="https://www.youtube.com/@torme_kig" className={mysite.socialMediaAuthor} target="_blank">
              <div className={`${mysite.socialMediaIconContainer} ${mysite.youtube}`}>
                <img src="https://yt3.ggpht.com/8VvqQAHpmpU1lqoDpNqDC2TRZmHtqn8eO14WorAfrs9QPfIWUMHm3r2hCm0WU_2UX51Bq7QjKA=s48-c-k-c0x00ffffff-no-rj" />
              </div>
              <div>とるめ</div>
            </a>
            <a href="https://www.youtube.com/@torme_kig" className={`${mysite.socialMediaButton} ${mysite.youtube}`} target="_blank">
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.instagram}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>Instagram</div>
            <div className={mysite.socialMediaHeaderSub}>ささめの日常アカウント</div>
          </div>
          <div>
            <div className={mysite.instagramIframe}>
              <img src=''/>
            </div>
          </div>
          <div className={`${mysite.socialMediaFooter} ${mysite.instagram}`}>
            <a href="https://www.instagram.com/sasame0123/" className={mysite.socialMediaAuthor} target="_blank">
              <div className={`${mysite.socialMediaIconContainer} ${mysite.instagram}`}>
                <img src="./img/instagram-icon.jpg" />
              </div>
              <div>sasame0123</div>
            </a>
            <a href="https://www.instagram.com/sasame0123/" className={`${mysite.socialMediaButton} ${mysite.instagram}`} target="_blank">
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.X}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>X<small> (Twitter)</small></div>
          </div>
          <div className={mysite.socialMediaMainColumn}>
            <div className={mysite.socialMediaMain}>
              <div className={mysite.socialMediaMainHeader}>着ぐるみさんの写真アカウント</div>
              <div>
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: 'torme_kig' // アカウント名
                    }}
                    options={{
                      height: '1500'
                    }}
                  />
                </div>
                <div className={`${mysite.socialMediaFooter} ${mysite.X}`}>
                  <a href="https://twitter.com/torme_kig" className={mysite.socialMediaAuthor} target="_blank">
                    <div className={`${mysite.socialMediaIconContainer} ${mysite.X}`}>
                      <img src="https://pbs.twimg.com/profile_images/1773969111179202560/FVE4EqPI_400x400.jpg" />
                    </div>
                    <div>@torme_kig</div>
                  </a>
                  <a href="https://twitter.com/torme_kig" className={`${mysite.socialMediaButton} ${mysite.X}`} target="_blank">
                    アカウントへ
                  </a>
                </div>
              </div>
            </div>
            <div className={mysite.socialMediaMain}>
              <div className={mysite.socialMediaMainHeader}>とるめの雑談アカウント</div>
              <div>
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: 'torme_etc' // アカウント名
                    }}
                    options={{
                      height: '1500'
                    }}
                  />
                  <div className={`${mysite.socialMediaFooter} ${mysite.X}`}>
                    <a href="https://twitter.com/torme_etc" className={mysite.socialMediaAuthor} target="_blank">
                    <div className={`${mysite.socialMediaIconContainer} ${mysite.X}`}>
                        <img src="https://pbs.twimg.com/profile_images/1550079970617487362/cNeFJAF5_400x400.jpg" />
                      </div>
                      <div>@torme_etc</div>
                    </a>
                    <a href="https://twitter.com/torme_etc" className={`${mysite.socialMediaButton} ${mysite.X}`} target="_blank">
                      アカウントへ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
      <Characters/>
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