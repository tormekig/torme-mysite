import { Link } from 'react-router-dom';
import './css/index.css';
import { SasameContent } from './sasame';
import { motion } from 'framer-motion';
import { Timeline } from 'react-twitter-widgets';

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
      <li className="link-button" key={i}>
        <a href={link.url} target="_blank">
          <div className="link-icon">
            <img src={link.img} />
          </div>
            <div className="link-text">
            <div className="link-text-sub">{link.text}</div>
          </div>
        </a>
      </li>
    )
  })

  return (
    <ul id="link-button-container">
      {buttons}
    </ul>
  )
}
function TopContent() {
  return (
    <div id="top-content">
    <div id="center-box">
      <div id="top-img-back-rect"></div>
      <div id="top-left-content">
        <motion.div
          initial={{ transform: "rotate(-5deg) scale(1.2)", opacity: 0 }}
          whileInView={{ transform: "rotate(-3deg) scale(1)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
          id="top-img-container"
        >
          <img id="top-img" src="img\221023.jpg" />
        </motion.div>
      </div>
      <div id="top-box">
        <h2 id="top-name" className="bgextend bgLRextend">
          <span className="bgappearTrigger bgappear">Torme<span className="top-name-blue"> - kig</span></span>
        </h2>
        <LinkButton/>
      </div>
    </div>
    </div>
  )
}

function TormeContent() {
  return (
    <div id="torme-content">
      <div id="profile-content">
        <motion.h2 className="fadeDown"
          initial={{ transform: "translateY(-5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          Torme's Profile
        </motion.h2>
        <motion.div className="profile-text"
          initial={{ transform: "translateX(-5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
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
        <motion.table className="profile-table"
          initial={{ transform: "translateX(5rem)", opacity: 0 }}
          whileInView={{ transform: "translateX(0)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
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
    <div className={"headline headline-" + color}>
      <h1 className="headline-main">
        <motion.span
          initial={{ transform: "translateX(-50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="slide-in">
          <motion.span
          initial={{ transform: "translateX(50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="slide-in_inner">
            {en}
          </motion.span>
        </motion.span>
      </h1>
      <p className="headline-sub">
        <motion.span
          initial={{ transform: "translateX(50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="slide-in">
          <motion.span
          initial={{ transform: "translateX(-50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="slide-in_inner">
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
    <div id="gallery-container">
      <ul id="gallery">
        {galleries}
      </ul>
    </div>
  )
}

function SocialMedia() {
  return (
    <div>
      <Header color={"green"} ja={"ソーシャルメディア"} en={"Social Media"} />
      <div className="social-media-content-container">
        <div className="social-media-content youtube">
          <div className="social-media-header">
            <div className="social-media-header-main">YouTube</div>
            <div className="social-media-header-sub">おすすめ動画</div>
          </div>
          <div className="social-media-iframe">
            <div className="youtube-iframe">
              <iframe width="100%" src="https://www.youtube.com/embed/mdYZVuJvwKg?si=keNIQPgkj67DzlKG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
          <div className="social-media-title">
            <a href="https://www.youtube.com/watch?v=mdYZVuJvwKg">
              【着ぐるみ】ささめのGeoGuessr実況【日本版 #1】
            </a>
          </div>
          <div className="social-media-footer">
            <a href="https://www.youtube.com/@torme_kig" className="social-media-author" target="_blank">
              <div className="social-media-icon-container youtube">
                <img src="https://yt3.ggpht.com/8VvqQAHpmpU1lqoDpNqDC2TRZmHtqn8eO14WorAfrs9QPfIWUMHm3r2hCm0WU_2UX51Bq7QjKA=s48-c-k-c0x00ffffff-no-rj" />
              </div>
              <div>とるめ</div>
            </a>
            <a href="https://www.youtube.com/@torme_kig" className="social-media-button youtube" target="_blank">
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className="social-media-content-container">
        <div className="social-media-content instagram">
          <div className="social-media-header">
            <div className="social-media-header-main">Instagram</div>
            <div className="social-media-header-sub">ささめの日常アカウント</div>
          </div>
          <div className="social-media-iframe">
            <div className="instagram-iframe">
              <img src=''/>
            </div>
          </div>
          <div className="social-media-footer instagram">
            <a href="https://www.instagram.com/sasame0123/" className="social-media-author" target="_blank">
              <div className="social-media-icon-container instagram">
                <img src="./img/instagram-icon.jpg" />
              </div>
              <div>sasame0123</div>
            </a>
            <a href="https://www.instagram.com/sasame0123/" className="social-media-button instagram" target="_blank">
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className="social-media-content-container">
        <div className="social-media-content X">
          <div className="social-media-header">
            <div className="social-media-header-main">X<small> (Twitter)</small></div>
          </div>
          <div className="social-media-main-column">
            <div className="social-media-main">
              <div className="social-media-main-header">着ぐるみさんの写真アカウント</div>
              <div className="social-media-iframe">
                <div className="X-iframe">
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
                <div className="social-media-footer X">
                  <a href="https://twitter.com/torme_kig" className="social-media-author" target="_blank">
                    <div className="social-media-icon-container X">
                      <img src="https://pbs.twimg.com/profile_images/1773969111179202560/FVE4EqPI_400x400.jpg" />
                    </div>
                    <div>@torme_kig</div>
                  </a>
                  <a href="https://twitter.com/torme_kig" className="social-media-button X" target="_blank">
                    アカウントへ
                  </a>
                </div>
              </div>
            </div>
            <div className="social-media-main">
              <div className="social-media-main-header">とるめの雑談アカウント</div>
              <div className="social-media-iframe">
                <div className="X-iframe">
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: 'torme_etc' // アカウント名
                    }}
                    options={{
                      height: '1500'
                    }}
                  />
                  <div className="social-media-footer X">
                    <a href="https://twitter.com/torme_etc" className="social-media-author">
                      <div className="social-media-icon-container X">
                        <img src="https://pbs.twimg.com/profile_images/1550079970617487362/cNeFJAF5_400x400.jpg" />
                      </div>
                      <div>@torme_etc</div>
                    </a>
                    <a href="https://twitter.com/torme_etc" className="social-media-button X" target="_blank">
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
    <div>
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

      <div className="dot-content" style={{backgroundImage: `url("./img/221029.jpg")`}}>
        <div className="dot-content-inner">
          <motion.div className="dot-content-content"
            initial={{ transform: "scale(1.2)", opacity: 0 }}
            whileInView={{ transform: "scale(1.0)", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1.0 }}
          >
            <div>ささめのことをもっと知りたい方はこちら</div>
            <div className="dot-content-content-a-outer">
              <Link to={`/sasame`}>ささめの部屋</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <SocialMedia/>

      <footer id="footer-container">
        <div className="footer">
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