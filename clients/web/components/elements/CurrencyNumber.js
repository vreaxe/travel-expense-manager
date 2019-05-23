import React from "react";

const CurrencyNumber = props => {
  return (
    <span>
      {/* get language from user selected */}
      {new Intl.NumberFormat("en", {
        style: "currency",
        currency: props.currency.code,
        maximumSignificantDigits: props.currency.decimal
      }).format(props.number)}
    </span>
  );
};

export default CurrencyNumber;
