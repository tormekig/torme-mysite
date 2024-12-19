import React from 'react'

import blog from '../../../assets/css/blog.module.scss'

import { Footer } from 'mysite/components/Footer'
import { convertPathToS3, ScrollTop } from 'utils/tools'
import { blogArticles } from '../data'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export function Article() {
  const { query: _query } = useParams()
  const query: number = _query ? parseInt(_query) : 0

  const article = blogArticles.get(query)
  if (!article) return <></>

  return (
    <>
      <Helmet>
        <title>{article.title} | Blog | Torme's Homepage</title>
      </Helmet>
      <div className={blog.mysiteBody}>
        <ScrollTop />
        <div id="container">
          <div
            id={blog.blogTopContainer}
            style={{
              backgroundImage: `url("${convertPathToS3(article.thumbnail)}")`,
            }}
          >
            <div id={blog.blogNameContainer}>
              <h1>Torme's Blog</h1>
              <h2 className={blog.articleTitle}>{article.title}</h2>
              <p className={blog.articleDate}>{article.date}</p>
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
                  <span>{article.title}</span>
                </li>
              </div>
              {article.article}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
