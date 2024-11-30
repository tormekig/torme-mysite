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
]

export default mysiteRoutes
