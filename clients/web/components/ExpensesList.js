import ExpenseCard from "./ExpenseCard";
import NoItems from "./NoItems";
import React from "react";
import groupBy from "lodash/groupBy";
import moment from "moment";

const ExpensesList = props => {
  const expenses = groupBy(props.expenses, item => {
    return moment(item.date).format("DD-MM-YYYY");
  });

  return (
    <>
      <NoItems itemName="expenses" items={props.expenses} />
      {expenses &&
        Object.keys(expenses).map(expensesDate => {
          return [
            <p key={expensesDate} className="font-bold text-gray-600 mb-2">
              {expensesDate}
            </p>,
            expenses[expensesDate].map(expense => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ];
        })}
    </>
  );
};

export default ExpensesList;
