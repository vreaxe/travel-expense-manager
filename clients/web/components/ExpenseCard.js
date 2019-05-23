import React from "react";
import CurrencyNumber from "./elements/CurrencyNumber";

const ExpenseCard = props => {
  return (
    <div className="flex bg-white mb-5 shadow p-4">
      <div className="w-1/2">
        <h2 className="text-md font-bold">{props.expense.title}</h2>
      </div>
      <div className="w-1/2">
        <p className="text-right">
          <CurrencyNumber
            number={props.expense.amount}
            currency={props.expense.currency}
          />
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
