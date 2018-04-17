import './Logo.css';
import React from 'react';

const Logo = (props) => {
    return (
        <div>
            <img src={props.src}/>
        </div>
    );
};

export default Logo;