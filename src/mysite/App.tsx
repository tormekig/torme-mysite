/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { RoutePath } from "myUtil";
import Top from "mysite/Top";
import { Sasame } from "mysite/sasame";

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