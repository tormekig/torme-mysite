import React from 'react'

import blog from '../../assets/css/blog.module.scss'

import { convertPathToS3, ScrollTop } from '../../../utils/tools'
import { Footer } from 'mysite/components/Footer'
import { Link } from 'react-router-dom'
import { BlogArticle, blogArticles } from './data'
import ReactDOMServer from 'react-dom/server'

export function Blog() {
  return (
    <div className={blog.mysiteBody}>
      <ScrollTop />
      <div id="container">
        <div
          id={blog.blogTopContainer}
          style={{
            backgroundImage: `url("${convertPathToS3('img/memory/2405バガテル公園/IMG_0682.jpeg')}")`,
          }}
        >
          <div id={blog.blogNameContainer}>
            <h1>Torme's Blog</h1>
          </div>
        </div>
        <div id={blog.blogContent}>
          <div id={blog.blogContentInner}>
            {blogArticles.map((art, i) => {
              return <BlogArticleListItem art={art} i={i} key={i} />
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

const removalTag = (elem: React.JSX.Element) => {
  const html = ReactDOMServer.renderToString(elem)
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(html, 'text/html')
  return doc.body.innerText
}

function BlogArticleListItem({ art, i }: { art: BlogArticle; i: number }) {
  return (
    <div className={blog.articleListItem}>
      <Link className={blog.articleListItemLink} to={`/blog/article/${i}`}>
        <div className={blog.articleListItemLeft}>
          <div
            className={blog.articleListItemImg}
            style={{
              backgroundImage: `url("${convertPathToS3(art.thumbnail)}")`,
            }}
          ></div>
        </div>
        <div className={blog.articleListItemRight}>
          <p className={blog.articleListItemDate}>{art.date}</p>
          <h3 className={blog.articleListItemTitle}>{art.title}</h3>
          <p className={blog.articleListItemContent}>
            {removalTag(art.article).slice(0, 150)}…
          </p>
        </div>
      </Link>
    </div>
  )
}
