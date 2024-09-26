import React from 'react'

import { motion } from 'framer-motion'

import mysite from '../../assets/css/mysite.module.scss'

export function Content() {
  return (
    <div id={mysite.sasameContent}>
      <div className={mysite.introPhoto}>
        <div className={mysite.introPhotoInner}>
          <motion.img
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.05 }}
            transition={{ ease: 'easeOut', duration: 10.0 }}
            src="img\230503.jpg"
          />
        </div>
      </div>
      <div className={mysite.introProfile}>
        <div id={mysite.profileContent}>
          <h2 id={mysite.sasameName}>
            <motion.div
              initial={{ transform: 'translateX(-50%)', opacity: 0 }}
              whileInView={{ transform: 'translateX(0%)', opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
              className="profile-name-main"
            >
              銀花 ささめ
            </motion.div>
            <motion.div
              initial={{ transform: 'translateX(50%)', opacity: 0 }}
              whileInView={{ transform: 'translateX(0%)', opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
              className={mysite.profileNameSmall}
            >
              Sasame Kanehana
            </motion.div>
          </h2>
          <div className={mysite.profileText}>
            <p>
              兔子のkigurumi工坊さんからお迎えした、
              <br />
              オリジナルキャラクターです。
            </p>
            <p>クールで優しい子。でもたまに甘えたくなるらしい。。</p>
          </div>
          <div className={mysite.tableContainer}>
            <table className={mysite.profileTable}>
              <tbody>
                <tr>
                  <th>年齢</th>
                  <td>21歳</td>
                </tr>
                <tr>
                  <th>誕生日</th>
                  <td>1月23日</td>
                </tr>
                <tr>
                  <th>お迎え記念日</th>
                  <td>2022年7月23日</td>
                </tr>
                <tr>
                  <th>出身</th>
                  <td>雪国</td>
                </tr>
                <tr>
                  <th>住処</th>
                  <td>都会のアパートで一人暮らし</td>
                </tr>
                <tr>
                  <th>家族</th>
                  <td>一人っ子</td>
                </tr>
                <tr>
                  <th>職業</th>
                  <td>私立の理系大学生</td>
                </tr>
                <tr>
                  <th>趣味</th>
                  <td>旅行、お酒</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
