import AddExpenseForm from "../components/forms/AddExpenseForm";
import AddExpenseLoader from "../components/loaders/AddExpenseLoader";
import BackButton from "../components/elements/BackButton";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { TRIP_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const AddExpense = props => {
  const { loading, error, data: dataTrip } = useQuery(TRIP_QUERY, {
    variables: { id: props.tripId }
  });

  if (loading) {
    return <AddExpenseLoader />;
  }

  return (
    <>
      <Meta title={`Add Expense to ${dataTrip.trip.title}`} />
      <Header>
        <BackButton routeName="trip" routeParams={{ id: dataTrip.trip.id }} />
        Add Expense to {dataTrip.trip.title}
      </Header>
      <AddExpenseForm trip={dataTrip.trip} />
    </>
  );
};

AddExpense.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(AddExpense);
