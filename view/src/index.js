import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";
import App from './components/App/App';

console.log(window.rewooc);

ReactDOM.render(
    <App appData={window.rewooc} />,
    document.querySelector('#rewooc')
);