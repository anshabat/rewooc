import React from 'react';
import Context from '../../../context';

const {Consumer} = Context;

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

        const formatPrice = (priceData, value) => {
            return formatCurrency({
                price: formatValue({
                    price: Number(value),
                    thousandSeparator: priceData.thousandSeparator,
                    decimalSeparator: priceData.decimalSeparator,
                    decimalsCount: priceData.decimals
                }),
                currency: priceData.currencySymbol,
                format: priceData.priceFormat
            });
        };

        return (
            <Consumer>
                {({price}) => <ComposedComponent
                    {...props}
                    formatPrice={value => formatPrice(price, value)}
                />}
            </Consumer>
        )
    };
};

export default priceProvider;