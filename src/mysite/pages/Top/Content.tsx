import React from 'react'

import { motion } from 'framer-motion'

import mysite from 'mysite/assets/css/mysite.module.scss'

export function TormeContent() {
  return (
    <div id={mysite.tormeContent}>
      <div id={mysite.profileContent}>
        <motion.h2
          initial={{ transform: 'translateY(-5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
        >
          Torme&apos;s Profile
        </motion.h2>
        <motion.div
          initial={{ transform: 'translateX(-5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
          className={mysite.profileText}
        >
          <p>
            私に興味を持っていただいてありがとうございます。
            <br />
            とるめ と申します。
          </p>
          <p>
            美少女系をメインに、着ぐるみが好きなただの成人男性です。
            <br />
            変身願望を満たすために、極限まで自分と違う姿を目指せる着ぐるみに魅力を感じました。
          </p>
          <p>法やルールはしっかりと守り、趣味の活動を続けていく所存です。</p>
        </motion.div>
        <motion.table
          initial={{ transform: 'translateX(5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
          className={mysite.profileTable}
        >
          <tbody>
            <tr>
              <th>場所</th>
              <td>
                神奈川県
                <br />
                以前は北海道にいました
              </td>
            </tr>
            <tr>
              <th>食</th>
              <td>
                美味しいもの好き
                <br />
                お酒も適度に飲みます。
                <br />
                ビールとか日本酒とか。
              </td>
            </tr>
            <tr>
              <th>旅行</th>
              <td>
                47都道府県全部行ったことあります
                <br />
                海外はまだ、、
              </td>
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
