/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import MAAreaCode from "./MAAreaCode";
import DisplayQuiz from "./DisplayQuiz";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/areacode/:query`} element={<MAAreaCode type={"areacode"}/>} />
        <Route path={`/MA/:query`} element={<MAAreaCode type={"MA"}/>} />
        <Route path={`/pref/:query`} element={<MAAreaCode type={"pref"}/>} />
        <Route path={`/city/:query`} element={<MAAreaCode type={"city"}/>} />
        <Route path={`/code/:query`} element={<MAAreaCode type={"code"}/>} />
        <Route path={`/random`} element={<MAAreaCode type={"random"}/>} />
        <Route path={`/quiz`} element={<DisplayQuiz/>} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;