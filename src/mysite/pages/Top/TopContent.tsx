import React from 'react'

import { motion } from 'framer-motion'
import { LinkButton } from './LinkButton'

import mysite from 'mysite/assets/css/mysite.module.scss'
import { convertPathToS3 } from 'utils/tools'

export function TopContent() {
  return (
    <div id={mysite.topContent}>
      <div id={mysite.centerBox}>
        <div id={mysite.topImgBackRect}></div>
        <div id={mysite.topLeftContent}>
          <motion.div
            initial={{ transform: 'rotate(-5deg) scale(1.2)', opacity: 0 }}
            whileInView={{ transform: 'rotate(-3deg) scale(1)', opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1.5 }}
            id={mysite.topImgContainer}
          >
            <img
              id={mysite.topImg}
              src={convertPathToS3('img/etc/221023.jpg')}
              alt={'top'}
            />
          </motion.div>
        </div>
        <div id={mysite.topBox}>
          <h2 id={mysite.topName} className="bgextend bgLRextend">
            <span className="bgappearTrigger bgappear">
              Torme<span className={mysite.topNameBlue}> - kig</span>
            </span>
          </h2>
          <LinkButton />
        </div>
      </div>
    </div>
  )
}
