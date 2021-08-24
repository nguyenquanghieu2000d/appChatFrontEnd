// import TimKiem from "./components/TimKiem/temp/TimKiem";
import LoginForm from "./components/login-form/LoginForm";
import React from 'react';
import ChatShell from "./containers/shell/ChatShell";

const routes = [
    {
        path: '/',
        element: <LoginForm/>,
    },
    {
        path: '/message',
        element: <ChatShell/>
    }
];

export default routes;