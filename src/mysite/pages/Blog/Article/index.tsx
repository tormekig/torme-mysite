import React from 'react'

import blog from '../../../assets/css/blog.module.scss'

import { Footer } from 'mysite/components/Footer'
import { convertPathToS3, ScrollTop } from 'utils/tools'
import { blogArticles } from '../data'
import { Link, useParams } from 'react-router-dom'

export function Article() {
  const { query: _query } = useParams()
  const query: number = _query ? parseInt(_query) : 0

  if (!blogArticles[query]) return <></>

  return (
    <div className={blog.mysiteBody}>
      <ScrollTop />
      <div id="container">
        <div
          id={blog.blogTopContainer}
          style={{
            backgroundImage: `url("${convertPathToS3(blogArticles[query].thumbnail)}")`,
          }}
        >
          <div id={blog.blogNameContainer}>
            <h1>Torme's Blog</h1>
            <h2 className={blog.articleTitle}>{blogArticles[query].title}</h2>
            <p className={blog.articleDate}>{blogArticles[query].date}</p>
          </div>
        </div>
        <div id={blog.blogContent}>
          <div id={blog.blogContentArticleInner}>
            <div className={blog.breadcrumb}>
              <li>
                <Link to={'/'}>トップ</Link>
              </li>
              <li>
                <Link to={'/blog'}>ブログ</Link>
              </li>
              <li>
                <span>{blogArticles[query].title}</span>
              </li>
            </div>
            {blogArticles[query].article}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
