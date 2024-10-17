import React from 'react'

import { ContentHeader } from '../../components/ContentHeader'
import { Timeline } from 'react-twitter-widgets'

import mysite from 'mysite/assets/css/mysite.module.scss'

export function SocialMedia() {
  return (
    <div>
      <ContentHeader
        color={mysite.headlineGreen}
        ja={'ソーシャルメディア'}
        en={'Social Media'}
      />
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.youtube}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>YouTube</div>
            <div className={mysite.socialMediaHeaderSub}>おすすめ動画</div>
          </div>
          <div>
            <div className={mysite.youtubeIframe}>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/mdYZVuJvwKg?si=keNIQPgkj67DzlKG"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className={mysite.socialMediaTitle}>
            <a href="https://www.youtube.com/watch?v=mdYZVuJvwKg">
              【着ぐるみ】ささめのGeoGuessr実況【日本版 #1】
            </a>
          </div>
          <div className={mysite.socialMediaFooter}>
            <a
              href="https://www.youtube.com/@torme_kig"
              className={mysite.socialMediaAuthor}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`${mysite.socialMediaIconContainer} ${mysite.youtube}`}
              >
                <img src="https://yt3.ggpht.com/8VvqQAHpmpU1lqoDpNqDC2TRZmHtqn8eO14WorAfrs9QPfIWUMHm3r2hCm0WU_2UX51Bq7QjKA=s48-c-k-c0x00ffffff-no-rj" />
              </div>
              <div>とるめ</div>
            </a>
            <a
              href="https://www.youtube.com/@torme_kig"
              className={`${mysite.socialMediaButton} ${mysite.youtube}`}
              target="_blank"
              rel="noreferrer"
            >
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.instagram}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>Instagram</div>
            <div className={mysite.socialMediaHeaderSub}>
              ささめの日常アカウント
            </div>
          </div>
          <div>
            <div className={mysite.instagramIframe}>
              <img src="" />
            </div>
          </div>
          <div className={`${mysite.socialMediaFooter} ${mysite.instagram}`}>
            <a
              href="https://www.instagram.com/sasame0123/"
              className={mysite.socialMediaAuthor}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`${mysite.socialMediaIconContainer} ${mysite.instagram}`}
              >
                <img src="./img/instagram-icon.jpg" />
              </div>
              <div>sasame0123</div>
            </a>
            <a
              href="https://www.instagram.com/sasame0123/"
              className={`${mysite.socialMediaButton} ${mysite.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              アカウントへ
            </a>
          </div>
        </div>
      </div>
      <div className={mysite.socialMediaContentContainer}>
        <div className={`${mysite.socialMediaContent} ${mysite.x}`}>
          <div className={mysite.socialMediaHeader}>
            <div className={mysite.socialMediaHeaderMain}>
              X<small> (Twitter)</small>
            </div>
          </div>
          <div className={mysite.socialMediaMainColumn}>
            <div className={mysite.socialMediaMain}>
              <div className={mysite.socialMediaMainHeader}>
                着ぐるみさんの写真アカウント
              </div>
              <div>
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: 'torme_kig', // アカウント名
                    }}
                    options={{
                      height: '1500',
                    }}
                  />
                </div>
                <div className={`${mysite.socialMediaFooter} ${mysite.x}`}>
                  <a
                    href="https://twitter.com/torme_kig"
                    className={mysite.socialMediaAuthor}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={`${mysite.socialMediaIconContainer} ${mysite.x}`}
                    >
                      <img src="https://pbs.twimg.com/profile_images/1773969111179202560/FVE4EqPI_400x400.jpg" />
                    </div>
                    <div>@torme_kig</div>
                  </a>
                  <a
                    href="https://twitter.com/torme_kig"
                    className={`${mysite.socialMediaButton} ${mysite.x}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    アカウントへ
                  </a>
                </div>
              </div>
            </div>
            <div className={mysite.socialMediaMain}>
              <div className={mysite.socialMediaMainHeader}>
                とるめの雑談アカウント
              </div>
              <div>
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: 'torme_etc', // アカウント名
                    }}
                    options={{
                      height: '1500',
                    }}
                  />
                  <div className={`${mysite.socialMediaFooter} ${mysite.x}`}>
                    <a
                      href="https://twitter.com/torme_etc"
                      className={mysite.socialMediaAuthor}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className={`${mysite.socialMediaIconContainer} ${mysite.x}`}
                      >
                        <img src="https://pbs.twimg.com/profile_images/1550079970617487362/cNeFJAF5_400x400.jpg" />
                      </div>
                      <div>@torme_etc</div>
                    </a>
                    <a
                      href="https://twitter.com/torme_etc"
                      className={`${mysite.socialMediaButton} ${mysite.x}`}
                      target="_blank"
                      rel="noreferrer"
                    >
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
