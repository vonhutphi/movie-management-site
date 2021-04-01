import "./App.scss";
import AuthPage from "./container/AdminTemplate/AuthPage";
import AdminTemplate from "./container/AdminTemplate";
import { Switch, Route } from "react-router-dom";
import { routeAdmin } from "./route";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import { GlobalStyle } from "./components/globalStyle";
import "antd/dist/antd.css";

function App() {
  const [theme, setTheme] = useState({
    status: true,
  });
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
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <BrowserRouter>
          <Switch>
            {showLayoutAdmin(routeAdmin)}
            <Route path="/auth" component={AuthPage} />
          </Switch>
          {/* <div
            className="btnMenu"
            onClick={() => {
              setTheme(
                theme.status === true
                  ? {status : false}
                  : {status : true}
              );
            }}
          >
            <div className="MenuLine"></div>
            <div className="MenuLine"></div>
            <div className="MenuLine"></div>
          </div> */}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
