/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import React from 'react'
import MAAreaCodeList from 'areacode/pages/list'
import Top from 'areacode/pages/top'
import { RoutePath } from 'utils/tools'
import DisplayQuiz from 'areacode/features/quiz'
import MapApp from 'areacode/features/map/digits2'

export const areacodeRoutes: RoutePath[] = [
  {
    path: ``,
    children: <Top />,
  },
  {
    path: `MA/:query`,
    children: <MAAreaCodeList type={'MA'} />,
  },
  {
    path: `pref/:query`,
    children: <MAAreaCodeList type={'pref'} />,
  },
  {
    path: `city/:query`,
    children: <MAAreaCodeList type={'city'} />,
  },
  {
    path: `code/:query`,
    children: <MAAreaCodeList type={'code'} />,
  },
  {
    path: `code/prefix/:query`,
    children: <MAAreaCodeList type={'code_prefix'} />,
  },
  {
    path: `dojinshi`,
    children: <MAAreaCodeList type={'dojinshi'} />,
  },
  {
    path: `all`,
    children: <MAAreaCodeList type={'all'} />,
  },
  {
    path: `random`,
    children: <MAAreaCodeList type={'random'} />,
  },
  {
    path: `quiz`,
    children: <DisplayQuiz />,
  },
  {
    path: `map`,
    children: <MapApp />,
  },
]

export default areacodeRoutes
