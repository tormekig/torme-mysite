/*
https://ralacode.com/blog/post/how-to-use-react-router/
https://blog.mitsuto.com/react-router-dom
https://reffect.co.jp/react/react-router-6/
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import areacodeRoutes from "./areacode/App.js";
import mysiteRoutes from "./mysite/App.js";
import NotFound from "./NotFound";
import Yamanote from "./Yamanote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {mysiteRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.children} />
          ))}
        </Route>
        <Route path="/areacode">
          {areacodeRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.children} />
          ))}
        </Route>
        <Route path={`/yamanote`} element={<Yamanote/>} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;