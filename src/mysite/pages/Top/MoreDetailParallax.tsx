import React from 'react'

import { Link } from 'react-router-dom'
import 'mysite/assets/css/mysite.module.scss'
import { motion } from 'framer-motion'

export function MoreDetailParallax({
  img,
  name,
  link,
}: {
  img: string
  name: string
  link: string
}) {
  return (
    <div className="dotContent" style={{ backgroundImage: `url("${img}")` }}>
      <div className="dotContentInner">
        <motion.div
          className="dotContentContent"
          initial={{ transform: 'scale(1.2)', opacity: 0 }}
          whileInView={{ transform: 'scale(1.0)', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1.0 }}
        >
          <div>{name}のことをもっと知りたい方はこちら</div>
          <div className="dotContentContentAOuter">
            <Link to={link}>{name}の部屋</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
