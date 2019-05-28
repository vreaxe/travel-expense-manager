import React from "react";
import moment from "moment";
import NoItems from "./NoItems";
import groupBy from "lodash/groupBy";
import ExpenseCard from "./ExpenseCard";

const ExpensesList = props => {
  const expenses = groupBy(props.expenses.expenses, item => {
    return moment(item.date).format("DD-MM-YYYY");
  });

  return (
    <>
      <NoItems itemName="expenses" items={props.expenses.expenses} />
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
