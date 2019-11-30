import Modali, { useModali } from "modali";
import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import Button from "./elements/Button";
import Color from "color";
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
        data-cy="expense-delete"
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

  const backgroundColorCategory =
    Color(props.expense.category.color).luminosity() > 0.7
      ? Color(props.expense.category.color)
          .alpha(0.5)
          .darken(0.5)
      : Color(props.expense.category.color)
          .alpha(0.5)
          .lighten(0.5);

  return (
    <div className="flex mb-5 expense-card">
      <div
        className="flex w-11/12 bg-white shadow p-3"
        style={{ borderLeft: `4px solid ${props.expense.category.color}` }}
      >
        <div className="w-1/2">
          <h2 className="text-md font-bold" data-cy="expense-title">
            {props.expense.title}
          </h2>
          <span
            data-cy="expense-category"
            className="text-sm font-bold"
            style={{
              borderRadius: "4px",
              padding: "2px 5px",
              color: props.expense.category.color,
              backgroundColor: backgroundColorCategory
            }}
          >
            {props.expense.category.name}
          </span>
        </div>
        <div className="w-1/2">
          <p className="flex justify-end items-center h-full">
            <CurrencyNumber
              data-cy="expense-amount"
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
            <Trash onClick={() => confirmDeleteModal()} />
          </div>
        </div>
      </div>
      <Modali.Modal {...confirmDelete} />
    </div>
  );
};

export default ExpenseCard;
