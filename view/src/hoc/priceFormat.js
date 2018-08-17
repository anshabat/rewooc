import React, {Component} from 'react';

const priceFormat = (PriceComponent) => {

    return class extends Component {

        constructor(props){
            super(props);
            console.log(props);
        }

        render () {
            return (
                <PriceComponent {...this.props} addParam={1} />
            )
        }
    };
};

export default priceFormat;