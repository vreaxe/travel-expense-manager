import CurrencyNumber from "./elements/CurrencyNumber";
import { DELETE_EXPENSE_MUTATION } from "../graphql/mutations";
import { Mutation } from "react-apollo";
import React from "react";
import { TRIP_EXPENSES_QUERY } from "../graphql/queries";
import Trash from "./elements/Trash";

const ExpenseCard = props => {
  return (
    <Mutation
      mutation={DELETE_EXPENSE_MUTATION}
      variables={{
        expenseId: props.expense.id,
        tripId: props.expense.trip.id
      }}
      refetchQueries={[
        {
          query: TRIP_EXPENSES_QUERY,
          variables: { tripId: props.expense.trip.id }
        }
      ]}
    >
      {(deleteExpense, { loading, error }) => (
        <div className="flex mb-5">
          <div className="flex w-11/12 bg-white shadow p-4">
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
          <div className="text-center w-1/12">
            <div className="">
              <Trash
                className="cursor-pointer"
                loading={loading}
                onClick={e => {
                  e.preventDefault();
                  deleteExpense();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default ExpenseCard;
