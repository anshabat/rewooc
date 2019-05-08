import React from 'react';
import {Consumer} from '../containers/App/App';

const priceProvider = (ComposedComponent) => {

    return (props) => {
        const formatValue = ({price, thousandSeparator = ' ', decimalSeparator = '.', decimalsCount = 2}) => {
            const priceString = price.toFixed(decimalsCount);
            const [intPrice, decimals] = priceString.split('.');
            let reversedIntPrice = '';

            for (let i = intPrice.length - 1, caret = 0; i >= 0; i--, caret++) {
                if (caret === 3) {
                    reversedIntPrice += thousandSeparator;
                    caret = 0;
                }
                reversedIntPrice += intPrice[i];
            }
            const resultIntPrice = reversedIntPrice.split("").reverse().join("");

            return (decimals) ? resultIntPrice + decimalSeparator + decimals : resultIntPrice;
        };

        const formatCurrency = ({price, currency, format}) => {
            return format.replace('%2$s', price).replace('&nbsp;', ' ').replace('%1$s', currency);
        };

        const formatPrice = (settings) => {
            return formatCurrency({
                price: formatValue({
                    price: Number(props.value),
                    thousandSeparator: settings.price.thousandSeparator,
                    decimalSeparator: settings.price.decimalSeparator,
                    decimalsCount: settings.price.decimals
                }),
                currency: settings.price.currencySymbol,
                format: settings.price.priceFormat
            });
        };

        return (
            <Consumer>
                {context => <ComposedComponent {...props} formattedPrice={formatPrice(context)}/>}
            </Consumer>
        )
    };
};

export default priceProvider;