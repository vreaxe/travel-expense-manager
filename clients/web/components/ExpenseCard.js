import Modali, { useModali } from "modali";
import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import Button from "./elements/Button";
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
  const [confirmDelete, confirmDeleteModal] = useModali({
    animated: true,
    centered: true,
    title: "Are you sure?",
    message: `Deleting expense named ${props.expense.title} permanently.`,
    buttons: [
      <Button
        style="transparent"
        size="small"
        onClick={() => confirmDeleteModal()}
      >
        Cancel
      </Button>,
      <Button
        loading={loading}
        style="danger"
        size="small"
        onClick={() => {
          deleteExpense();
          confirmDeleteModal();
        }}
      >
        Delete
      </Button>
    ]
  });

  return (
    <div className="flex mb-5">
      <div
        className="flex w-11/12 bg-white shadow p-3"
        style={{ borderLeft: `4px solid ${props.expense.category.color}` }}
      >
        <div className="w-1/2">
          <h2 className="text-md font-bold">{props.expense.title}</h2>
          <span className="text-sm">{props.expense.category.name}</span>
        </div>
        <div className="w-1/2">
          <p className="flex justify-end items-center h-full">
            <CurrencyNumber
              number={props.expense.amount}
              currency={props.expense.currency}
            />
          </p>
        </div>
      </div>
      <div className="text-center w-1/12">
        <div className="h-full">
          <div className="flex items-center justify-center h-half">
            <Link
              route="editExpense"
              params={{
                tripId: props.expense.trip.id,
                expenseId: props.expense.id
              }}
            >
              <a className="block outline-none">
                <Pencil />
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center h-half">
            <Trash
              onClick={e => {
                e.preventDefault();
                confirmDeleteModal();
              }}
            />
          </div>
        </div>
      </div>
      <Modali.Modal {...confirmDelete} />
    </div>
  );
};

export default ExpenseCard;
