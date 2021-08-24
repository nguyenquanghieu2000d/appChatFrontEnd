import React from 'react';
import ChatShell from './containers/shell/ChatShell';
import LoginForm from "./components/login-form/LoginForm";
import {ToastProvider} from "react-toast-notifications";
import routes from "./routes";
import {useRoutes} from "react-router-dom";

const App = () => {
    const routing = useRoutes(routes)

  return (
      <ToastProvider autoDismissTimeout={2000} autoDismiss={true}>
          {routing}
          {/*<LoginForm/>*/}
      </ToastProvider>
    // <ChatShell />
  );
}

export default App;
