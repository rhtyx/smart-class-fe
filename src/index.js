import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import StaffLayout from "layouts/staff";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`}>
              {
                localStorage.getItem("token")? <Redirect to={"/staff"} /> : <AuthLayout />
              }
            </Route>
            <Route path={`/staff`}>
              {
                localStorage.getItem("token") === null? <Redirect to={"/auth"} /> : <StaffLayout />
              }
            </Route>
            <Redirect from='/' to='/auth' />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
