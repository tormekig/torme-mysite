/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import MAAreaCode from "./MAAreaCode";
import DisplayQuiz from "./quiz/displayQuiz";

export const areacodeRoutes = [
  {
    path: ``,
    children: <Top />
  },
  {
    path: `MA/:query`,
    children: <MAAreaCode type={"MA"}/>
  },
  {
    path: `pref/:query`,
    children: <MAAreaCode type={"pref"}/>
  },
  {
    path: `city/:query`,
    children: <MAAreaCode type={"city"}/>
  },
  {
    path: `code/:query`,
    children: <MAAreaCode type={"code"}/>
  },
  {
    path: `code/prefix/:query`,
    children: <MAAreaCode type={"code_prefix"}/>
  },
  {
    path: `all`,
    children: <MAAreaCode type={"all"}/>
  },
  {
    path: `random`,
    children: <MAAreaCode type={"random"}/>
  },
  {
    path: `quiz`,
    children: <DisplayQuiz />
  },
];

export default areacodeRoutes;