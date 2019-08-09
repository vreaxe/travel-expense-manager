import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import BackButton from "./elements/BackButton";
import ExpensesList from "./ExpensesList";
import FAB from "./elements/FAB";
import Header from "./elements/Header";
import Meta from "./layouts/Meta";
import NoItems from "./NoItems";
import React from "react";
import { Router } from "../routes";
import TripInfo from "./TripInfo";
import TripItemLoader from "./loaders/TripItemLoader";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";

const TripItem = props => {
  const {
    loading: loadingTrip,
    error: errorTrip,
    data: { trip }
  } = useQuery(TRIP_QUERY, {
    variables: { id: props.tripId }
  });
  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: { expenses }
  } = useQuery(TRIP_EXPENSES_QUERY, { variables: { tripId: props.tripId } });

  if (loadingTrip || loadingExpenses) {
    return <TripItemLoader />;
  }

  if (typeof expenses === "undefined" || typeof trip === "undefined") {
    return <NoItems itemName="trip" />;
  }

  return (
    <>
      <Meta title={trip.title} />
      <Header>
        <BackButton routeName="trips" />
        {trip.title}
        <span className="ml-auto text-sm text-gray-600 text-right">
          {moment(trip.startDate).format("DD-MM-YYYY")}
          {" ➡ "}
          {moment(trip.endDate).format("DD-MM-YYYY")}
        </span>
      </Header>
      <TripInfo trip={trip} />
      <ExpensesList expenses={expenses} />
      <FAB
        onClick={() => Router.pushRoute("addExpense", { id: trip.id })}
        position={{ bottom: 30, right: 30 }}
        tooltipContent="Add Expense"
      >
        <p className="text-center w-full text-2xl text-white">＋</p>
      </FAB>
    </>
  );
};

export default TripItem;
