import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import CurrencyNumber from "./elements/CurrencyNumber";
import { DELETE_EXPENSE_MUTATION } from "../graphql/mutations";
import { Link } from "../routes";
import Pencil from "./elements/Pencil";
import React from "react";
import Trash from "./elements/Trash";
import { useMutation } from "@apollo/react-hooks";

const ExpenseCard = props => {
  const [deleteExpense, { loading, error }] = useMutation(
    DELETE_EXPENSE_MUTATION,
    {
      variables: {
        expenseId: props.expense.id,
        tripId: props.expense.trip.id
      },
      refetchQueries: [
        {
          query: TRIP_QUERY,
          variables: { id: props.expense.trip.id }
        },
        {
          query: TRIP_EXPENSES_QUERY,
          variables: { tripId: props.expense.trip.id }
        }
      ]
    }
  );

  return (
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
          <div className="mb-1">
            <Link
              route="editExpense"
              params={{
                tripId: props.expense.trip.id,
                expenseId: props.expense.id
              }}
            >
              <a className="block">
                <Pencil />
              </a>
            </Link>
          </div>
          <div>
            <Trash
              loading={loading}
              onClick={e => {
                e.preventDefault();
                deleteExpense();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
