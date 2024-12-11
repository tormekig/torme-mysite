import React from 'react'

import { motion } from 'framer-motion'
import { ContentHeader } from '../../components/ContentHeader'

import mysite from 'mysite/assets/css/mysite.module.scss'

export function Tips() {
  return (
    <div>
      <ContentHeader color={mysite.headlineGreen} ja={'お役立ち'} en={'Tips'} />
      <div id={mysite.tipsContent}>
        <motion.h2
          initial={{ transform: 'translateY(-5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
        >
          写真の掲載について
        </motion.h2>
        <motion.div
          initial={{ transform: 'translateX(-5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
          className={mysite.profileText}
        >
          <h3>私が持つキャラクターが写っている写真</h3>
          <p>
            撮影してもらった写真は、基本的に自由に投稿していただいて構いません！
            <br />
            加工なども自由です。
          </p>
          <p>ただし、以下のことに留意してもらえますと嬉しいです。</p>
          <ul>
            <li>キャラクターのイメージを損なわないこと</li>
            <li>私（とるめ @torme_kig）をメンションまたはタグ付けすること</li>
          </ul>
          <p>
            メンションは、ツイート内でもツリーにぶら下げでも、どちらでも構いません！
          </p>
          <div className={mysite.tipsBar}></div>
          <p>
            ご自身で撮影された写真でない場合は、撮影者に許可を取り、
            <br />
            撮影者が必要とした場合は撮影者などを明記してください。
          </p>
        </motion.div>
        <motion.div
          initial={{ transform: 'translateX(5rem)', opacity: 0 }}
          whileInView={{ transform: 'translateX(0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
          className={mysite.profileText}
        >
          <h3>私が撮影した写真</h3>
          <p>
            私が撮影した写真も、基本的に自由に投稿していただいて構いません！
            <br />
            加工なども自由です。
          </p>
          <p>ただし、以下のことに留意してもらえますと嬉しいです。</p>
          <ul>
            <li>私（とるめ @torme_kig）をメンションまたはタグ付けすること</li>
          </ul>
          <p>
            メンションは、ツイート内でもツリーにぶら下げでも、どちらでも構いません！
          </p>
        </motion.div>
      </div>
    </div>
  )
}
