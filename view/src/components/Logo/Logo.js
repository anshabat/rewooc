import './Logo.css';
import React from 'react';

const Logo = (props) => (
    <div className="pc-logo">
        <img src={props.image[0]} alt={props.image[4]} width={props.image[1]} height={props.image[2]}/>
    </div>
);

export default Logo;