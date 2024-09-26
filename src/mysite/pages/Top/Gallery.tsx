import React from 'react'

import { motion } from 'framer-motion'

import mysite from 'mysite/assets/css/mysite.module.scss'

export function Gallery() {
  interface Img {
    img: string
    caption?: string
  }

  const imgs: Img[] = [
    {
      img: 'img/220723.jpg',
    },
    {
      img: 'img/220731.jpg',
    },
    {
      img: 'img/221029.jpg',
    },
    {
      img: 'img/221031.jpg',
    },
    {
      img: 'img/221107.jpg',
    },
    {
      img: 'img/220723.jpg',
    },
    {
      img: 'img/220731.jpg',
    },
    {
      img: 'img/221029.jpg',
    },
    {
      img: 'img/221031.jpg',
    },
    {
      img: 'img/221107.jpg',
    },
  ]

  const galleries: React.JSX.Element[] = []

  imgs.forEach(function (img, i) {
    const caption = img.caption ? img.caption : ''
    galleries.push(
      <motion.li
        initial={{ transform: 'rotateY(30deg)', opacity: 0 }}
        whileInView={{ transform: 'rotateY(0deg)', opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
        key={i}
      >
        <a href={img.img} data-lightbox="sasame-gallery" data-title={caption}>
          <img src={img.img} alt={img.caption} />
        </a>
      </motion.li>,
    )
  })

  return (
    <div id={mysite.galleryContainer}>
      <ul id={mysite.gallery}>{galleries}</ul>
    </div>
  )
}
