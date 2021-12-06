import React from 'react';
import ReactDOM from "react-dom";
import AuthPage from './auth/index'


import "@static/reset.less";

function App() {
    return <AuthPage />
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);