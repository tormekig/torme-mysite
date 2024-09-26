import React from 'react';

import { motion } from 'framer-motion';

import mysite from 'mysite/css/mysite.module.scss';

export function Header({color, ja, en}: {color?: string, ja: string, en: string}) {
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