import BackButton from "../components/elements/BackButton";
import EditExpenseForm from "../components/forms/EditExpenseForm";
import EditExpenseLoader from "../components/loaders/EditExpenseLoader";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { TRIP_EXPENSE_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const EditExpense = props => {
  const { loading, error, data } = useQuery(TRIP_EXPENSE_QUERY, {
    variables: { tripId: props.tripId, expenseId: props.expenseId }
  });

  if (loading) {
    return <EditExpenseLoader />;
  }

  return (
    <>
      <Meta title={`Edit Expense: ${data.expense.title}`} />
      <Header>
        <BackButton
          routeName="trip"
          routeParams={{ id: data.expense.trip.id }}
        />
        Edit Expense: {data.expense.title}
      </Header>
      <EditExpenseForm expense={data.expense} />
    </>
  );
};

EditExpense.getInitialProps = ({ query }) => {
  return { tripId: query.tripId, expenseId: query.expenseId };
};

export default withAuth(EditExpense);
