import React from 'react'

import { Link } from 'react-router-dom'
import mysite from 'mysite/assets/css/mysite.module.scss'

export const Footer = () => {
  return (
    <footer id={mysite.footerContainer}>
      <div className={mysite.footer}>
        <small>
          copyright 2023 torme_kig All rights reserved.
          <Link to={`/areacode`}>
            <img src="img/phone.png" />
          </Link>
        </small>
      </div>
    </footer>
  )
}
