import React from 'react'

import { motion } from 'framer-motion'
import mysite from '../../assets/css/mysite.module.scss'
import { convertPathToS3 } from 'utils/tools'

export function Content() {
  return (
    <div id={mysite.emuContent}>
      <div className={mysite.introPhoto}>
        <div className={mysite.introPhotoInner}>
          <motion.img
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.05 }}
            transition={{ ease: 'easeOut', duration: 10.0 }}
            src={convertPathToS3('img/etc/Emu240424.JPG')}
          />
        </div>
      </div>
      <div className={mysite.introProfile}>
        <div id={mysite.profileContent}>
          <h2 id={mysite.emuName}>
            <motion.div
              initial={{ transform: 'translateX(-50%)', opacity: 0 }}
              whileInView={{ transform: 'translateX(0%)', opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
              className="profile-name-main"
            >
              鳳 えむ
            </motion.div>
            <motion.div
              initial={{ transform: 'translateX(50%)', opacity: 0 }}
              whileInView={{ transform: 'translateX(0%)', opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
              className={mysite.profileNameSmall}
            >
              Emu Otori
            </motion.div>
          </h2>
          <div className={mysite.profileText}>
            <p>
              たっくんまるさんの個人工房からお迎えした、
              <br />
              ゲームキャラクターです。
            </p>
            <p>底抜けに明るい、天真爛漫な性格。</p>
            <p>「うわわーっ☆それってとっても わんだほーいだね！」</p>
          </div>
          <div className={mysite.tableContainer}>
            <table className={mysite.profileTable}>
              <tbody>
                <tr>
                  <th>登場作品</th>
                  <td>プロジェクトセカイ カラフルステージ！ feat. 初音ミク</td>
                </tr>
                <tr>
                  <th>誕生日</th>
                  <td>9月9日</td>
                </tr>
                <tr>
                  <th>お迎え記念日</th>
                  <td>2024年3月30日</td>
                </tr>
                <tr>
                  <th>学年</th>
                  <td>高校2年生</td>
                </tr>
                <tr>
                  <th>趣味</th>
                  <td>ご近所探検</td>
                </tr>
                <tr>
                  <th>特技</th>
                  <td>
                    アクロバット
                    <br />
                    なんでも美味しく食べられる
                  </td>
                </tr>
                <tr>
                  <th>苦手なもの・こと</th>
                  <td>夕暮れ</td>
                </tr>
                <tr>
                  <th>好きな食べ物</th>
                  <td>たい焼き</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
