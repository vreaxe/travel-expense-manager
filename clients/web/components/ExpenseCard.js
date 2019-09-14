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
              <a className="block outline-none">
                <Pencil />
              </a>
            </Link>
          </div>
          <div>
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
