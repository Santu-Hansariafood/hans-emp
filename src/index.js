import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Loading from "./components/common/Loading/Loading";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
