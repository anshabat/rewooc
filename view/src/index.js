import './vendor/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";
import App from './containers/App/App';

ReactDOM.render(
    <App appData={window.salesZone} />,
    document.querySelector('#premmerce')
);