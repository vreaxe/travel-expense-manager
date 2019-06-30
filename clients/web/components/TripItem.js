import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import moment from "moment";
import Meta from "./layouts/Meta";
import ExpensesList from "./ExpensesList";
import TripInfo from "./TripInfo";
import BackButton from "./elements/BackButton";
import NoItems from "./NoItems";
import FAB from "./elements/FAB";
import { Router } from "../routes";
import { TRIP_QUERY, TRIP_EXPENSES_QUERY } from "../graphql/queries";

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
            <h1 className="flex items-center font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
              <BackButton routeName="trips" />
              {trip.data.trip.title}
              <span className="ml-auto text-sm text-gray-600 text-right">
                {moment(trip.data.trip.startDate).format("DD-MM-YYYY")}
                {" ➡ "}
                {moment(trip.data.trip.endDate).format("DD-MM-YYYY")}
              </span>
            </h1>
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
