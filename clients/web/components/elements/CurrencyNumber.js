import React from "react";

const CurrencyNumber = ({ currency, number, ...rest }) => {
  return (
    <span {...rest}>
      {/* TODO get language from user selected */}
      {new Intl.NumberFormat("en", {
        style: "currency",
        currency: currency.code,
        maximumSignificantDigits: currency.decimal
      }).format(number)}
    </span>
  );
};

export default CurrencyNumber;
