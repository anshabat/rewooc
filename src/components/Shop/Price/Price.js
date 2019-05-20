import './Price.scss';
import React from 'react';
import priceProvider from '../../../providers/priceProvider';

const Price = (props) => {
    return (
        <div className="rw-price">
            <div className="rw-price__value">{props.formattedPrice}</div>
        </div>
    );
};

export default priceProvider(Price);