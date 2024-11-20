import React from 'react'

import { Link } from 'react-router-dom'
import mysite from 'mysite/assets/css/mysite.module.scss'
import { motion } from 'framer-motion'

export function MoreDetailParallax({
  img,
  name,
  link,
  className,
}: {
  img: string
  name: string
  link: string
  className: string
}) {
  return (
    <div
      className={mysite.dotContent}
      style={{ backgroundImage: `url("${img}")` }}
    >
      <div className={mysite.dotContentInner}>
        <motion.div
          className={mysite.dotContentContent}
          initial={{ transform: 'scale(1.2)', opacity: 0 }}
          whileInView={{ transform: 'scale(1.0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1.0 }}
        >
          <div>{name}のことをもっと知りたい方はこちら</div>
          <div className={`${className}`}>
            <Link to={link}>{name}の部屋</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
