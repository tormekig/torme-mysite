import React from 'react'

import mysite from 'mysite/assets/css/mysite.module.scss'
import { convertPathToS3 } from 'utils/tools'

export function LinkButton() {
  const buttons: React.JSX.Element[] = []

  const links = [
    {
      url: 'https://twitter.com/torme_kig',
      img: 'img/logo/logo.svg',
      text: '@torme_kig',
    },
    {
      url: 'https://twitter.com/torme_etc',
      img: 'img/logo/logo.svg',
      text: '@torme_etc',
    },
    {
      url: 'https://www.youtube.com/@torme_kig',
      img: 'img/logo/youtube_white.png',
      text: '@torme_kig',
    },
    {
      url: 'https://www.instagram.com/sasame0123/',
      img: 'img/logo/Instagram_Glyph_White.svg',
      text: '@sasame0123',
    },
  ]

  links.forEach(function (link, i) {
    buttons.push(
      <li className={mysite.linkButton} key={i}>
        <a href={link.url} target="_blank" rel="noreferrer">
          <div className={mysite.linkIcon}>
            <img src={convertPathToS3(link.img)} />
          </div>
          <div className={mysite.linkText}>
            <div className={mysite.linkTextSub}>{link.text}</div>
          </div>
        </a>
      </li>,
    )
  })

  return <ul id={mysite.linkButtonContainer}>{buttons}</ul>
}
