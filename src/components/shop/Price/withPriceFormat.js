import React, {useContext} from "react";
import {AppContext} from "../../../context/appContext";

const formatValue = ({price, thousandSeparator = " ", decimalSeparator = ".", decimalsCount = 2}) => {
  const priceString = price.toFixed(decimalsCount);
  const [intPrice, decimals] = priceString.split(".");
  let reversedIntPrice = "";

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
  return format.replace("%2$s", price).replace("&nbsp;", " ").replace("%1$s", currency);
};

const formatPrice = (options, value) => {
  return formatCurrency({
    price: formatValue({
      price: Number(value),
      thousandSeparator: options.thousandSeparator,
      decimalSeparator: options.decimalSeparator,
      decimalsCount: options.decimals
    }),
    currency: options.currencySymbol,
    format: options.priceFormat
  });
};

// eslint-disable-next-line react/display-name
const withPriceFormat = (InitialComponent) => props => {
  const {price} = useContext(AppContext);
  return (
    <InitialComponent
      {...props}
      formatPrice={value => formatPrice(price, value)}
    />
  )
}

export default withPriceFormat;