/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import React from 'react';

import { RoutePath } from "myUtil";
import { Sasame } from "mysite/pages/Sasame";
import Top from "mysite/pages/Top";

export const mysiteRoutes: RoutePath[] = [
  {
    path: `torme`,
    children: <Top />
  },
  {
    path: `sasame`,
    children: <Sasame/>
  },
];

export default mysiteRoutes;