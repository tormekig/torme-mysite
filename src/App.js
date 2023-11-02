/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MAAreaCode from "./MAAreaCode";
// import Register from "./Register";
// import Login from "./Login";
// import Archive from "./Archive";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<MAAreaCode />} />
        {/* <Route path={`/register/`} element={<Register />} />
        <Route path={`/login/`} element={<Login />} />
        <Route path={`/archive/:id`} element={<Archive />} /> */}
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;