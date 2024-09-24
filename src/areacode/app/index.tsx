/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import MAAreaCodeList from "areacode/pages/list";
import Top from "areacode/pages/top";
// import DisplayQuiz from "areacode/quiz/displayQuiz";
import { RoutePath } from "myUtil";

export const areacodeRoutes: RoutePath[] = [
  {
    path: ``,
    children: <Top />
  },
  {
    path: `MA/:query`,
    children: <MAAreaCodeList type={"MA"}/>
  },
  {
    path: `pref/:query`,
    children: <MAAreaCodeList type={"pref"}/>
  },
  {
    path: `city/:query`,
    children: <MAAreaCodeList type={"city"}/>
  },
  {
    path: `code/:query`,
    children: <MAAreaCodeList type={"code"}/>
  },
  {
    path: `code/prefix/:query`,
    children: <MAAreaCodeList type={"code_prefix"}/>
  },
  {
    path: `all`,
    children: <MAAreaCodeList type={"all"}/>
  },
  {
    path: `random`,
    children: <MAAreaCodeList type={"random"}/>
  },
  // {
  //   path: `quiz`,
  //   children: <DisplayQuiz />
  // },
];

export default areacodeRoutes;