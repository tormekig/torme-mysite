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
        </div>
      </div>
    </div>
  )
}
