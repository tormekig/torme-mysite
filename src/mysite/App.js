/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import Top from "./Top";
import { Sasame } from "./sasame";

export const mysiteRoutes = [
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