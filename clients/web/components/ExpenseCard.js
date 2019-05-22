import React from "react";

const ExpenseCard = props => {
  return (
    <div className="flex bg-white mb-5 shadow p-4">
      <div className="w-1/2">
        <h2 className="text-md font-bold">{props.expense.title}</h2>
      </div>
      <div className="w-1/2">
        <p className="text-right">
          {props.expense.amount}&nbsp;
          {props.expense.currency.symbol}
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
