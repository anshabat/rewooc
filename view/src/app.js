import React from 'react';
import ReactDOM from "react-dom";
import Nav from './components/navigation/navigation';

ReactDOM.render(<Nav items={window.salesZone.mainNavigation}/>, document.querySelector('[data-sz="nav"]'));