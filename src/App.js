/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import MAAreaCode from "./MAAreaCode";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/areacode/:query`} element={<MAAreaCode type={1}/>} />
        <Route path={`/MA/:query`} element={<MAAreaCode type={2}/>} />
        <Route path={`/pref/:query`} element={<MAAreaCode type={3}/>} />
        <Route path={`/city/:query`} element={<MAAreaCode type={4}/>} />
        <Route path={`/code/:query`} element={<MAAreaCode type={5}/>} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;