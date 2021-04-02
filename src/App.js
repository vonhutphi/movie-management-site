import "./App.scss";
import AuthPage from "./container/AdminTemplate/AuthPage";
import AdminTemplate from "./container/AdminTemplate";
import { Switch, Route } from "react-router-dom";
import { routeAdmin } from "./route";

import { BrowserRouter } from "react-router-dom";
import React from "react";

import "antd/dist/antd.css";

function App() {
  const showLayoutAdmin = (route) => {
    if (route && route.length > 0) {
      return route.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Compnent={item.component}
          />
        );
      });
    }
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          {showLayoutAdmin(routeAdmin)}
          {/* <Route path="/auth" component={AuthPage} /> */}
          <Route path="/" exact component={AuthPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
