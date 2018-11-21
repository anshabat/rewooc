import './Button.css';
import React from 'react';

const Button = (props) => {
    return (
        <button className={`pc-button pc-button--${props.size} pc-button--${props.color} ${props.className}`}>
            <span>{props.children}</span>
        </button>
    );
};

export default Button;