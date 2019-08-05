import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import BackButton from "./elements/BackButton";
import ExpensesList from "./ExpensesList";
import FAB from "./elements/FAB";
import Header from "./elements/Header";
import Meta from "./layouts/Meta";
import NoItems from "./NoItems";
import { Query } from "react-apollo";
import React from "react";
import { Router } from "../routes";
import TripInfo from "./TripInfo";
import TripItemLoader from "./loaders/TripItemLoader";
import { adopt } from "react-adopt";
import moment from "moment";

const TripItem = props => {
  const Queries = adopt({
    trip: ({ render }) => (
      <Query query={TRIP_QUERY} variables={{ id: props.tripId }}>
        {render}
      </Query>
    ),
    expenses: ({ render }) => (
      <Query query={TRIP_EXPENSES_QUERY} variables={{ tripId: props.tripId }}>
        {render}
      </Query>
    )
  });
  return (
    <Queries>
      {({ trip, expenses }) => {
        if (trip.loading || expenses.loading) {
          return <TripItemLoader />;
        }

        if (
          typeof trip.data === "undefined" ||
          typeof trip.data.trip === "undefined" ||
          typeof expenses.data === "undefined" ||
          typeof expenses.data.expenses === "undefined"
        ) {
          return <NoItems itemName="trip" />;
        }

        return (
          <>
            <Meta title={trip.data.trip.title} />
            <Header>
              <BackButton routeName="trips" />
              {trip.data.trip.title}
              <span className="ml-auto text-sm text-gray-600 text-right">
                {moment(trip.data.trip.startDate).format("DD-MM-YYYY")}
                {" ➡ "}
                {moment(trip.data.trip.endDate).format("DD-MM-YYYY")}
              </span>
            </Header>
            <TripInfo trip={trip.data.trip} />
            <ExpensesList expenses={expenses.data} />
            <FAB
              onClick={() =>
                Router.pushRoute("addExpense", { id: trip.data.trip.id })
              }
              position={{ bottom: 30, right: 30 }}
              tooltipContent="Add Expense"
            >
              <p className="text-center w-full text-2xl text-white">＋</p>
            </FAB>
          </>
        );
      }}
    </Queries>
  );
};

export default TripItem;
