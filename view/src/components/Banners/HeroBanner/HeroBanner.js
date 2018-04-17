import '../../../assets/css/shared/btn.css';
import './HeroBanner.css';
import React from 'react';

const HeroBanner = (props) => {
    return (
        <div className="pc-hero-banner">
            <h1 className="pc-hero-banner__title">This is the banner</h1>
            <button className="ps-btn">Shop now</button>
        </div>
    )
};

export default HeroBanner;