import React from 'react';
import {appData} from '../index';

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

        const formatPrice = () => {
            return formatCurrency({
                price: formatValue({
                    price: Number(props.value),
                    thousandSeparator: appData.settings.price.thousandSeparator,
                    decimalSeparator: appData.settings.price.decimalSeparator,
                    decimalsCount: appData.settings.price.decimals
                }),
                currency: appData.settings.price.currencySymbol,
                format: appData.settings.price.priceFormat
            });
        };

        return (
            <ComposedComponent {...props} formattedPrice={formatPrice()}/>
        )
    };
};

export default priceProvider;