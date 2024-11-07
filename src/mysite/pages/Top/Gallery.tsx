import React from 'react'

import { motion } from 'framer-motion'

import mysite from 'mysite/assets/css/mysite.module.scss'

interface Img {
  img: string
  caption?: string
}

const imgs: { [key: string]: Img[] } = {
  sasame: [
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
  ],
}

export function Gallery({ name }: { name: string }) {
  if (!imgs[name]) return <></>

  const galleries: React.JSX.Element[] = []

  imgs[name].forEach(function (img, i) {
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
