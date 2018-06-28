import './Arrow.css';
import React from 'react';

const Arrow = (props) => (
    <button onClick={props.onClick}>{props.ico}</button>
);

export default Arrow;