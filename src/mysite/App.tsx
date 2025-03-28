/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import React from 'react'

import { Sasame } from './pages/Sasame'
import Top from './pages/Top'
import { RoutePath } from 'utils/tools'
import { Emu } from './pages/Emu'
import { Blog } from './pages/Blog'
import { Article } from './pages/Blog/Article'

export const mysiteRoutes: RoutePath[] = [
  {
    path: ``,
    children: <Top />,
  },
  {
    path: `sasame`,
    children: <Sasame />,
  },
  {
    path: `emu`,
    children: <Emu />,
  },
  {
    path: `blog`,
    children: <Blog />,
  },
  {
    path: `blog/article/:query`,
    children: <Article />,
  },
]

export default mysiteRoutes
