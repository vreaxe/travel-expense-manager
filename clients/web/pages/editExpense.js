import BackButton from "../components/elements/BackButton";
import EditExpenseForm from "../components/forms/EditExpenseForm";
import EditExpenseLoader from "../components/loaders/EditExpenseLoader";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { Router } from "../routes";
import { TRIP_EXPENSE_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const EditExpense = props => {
  const {
    loading,
    error,
    data: { expense }
  } = useQuery(TRIP_EXPENSE_QUERY, {
    variables: { tripId: props.tripId, expenseId: props.expenseId }
  });

  if (loading) {
    return <EditExpenseLoader />;
  }

  return (
    <>
      <Meta title={`Edit Expense: ${expense.title}`} />
      <Header>
        <BackButton routeName="trip" routeParams={{ id: expense.trip.id }} />
        Edit Expense: {expense.title}
      </Header>
      <EditExpenseForm expense={expense} />
    </>
  );
};

EditExpense.getInitialProps = ({ query }) => {
  return { tripId: query.tripId, expenseId: query.expenseId };
};

export default withAuth(EditExpense);
