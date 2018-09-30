import './Price.css';
import React from 'react';
import priceFormat from '../../../hoc/priceFormat';

const Price = (props) => {
    return (
        <div className="rw-price">
            <div className="rw-price__value">{props.formattedPrice}</div>
        </div>
    );
};

export default priceFormat(Price);