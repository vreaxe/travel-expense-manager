import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import moment from "moment";
import Meta from "./layouts/Meta";
import ExpensesList from "./ExpensesList";
import TripInfo from "./TripInfo";
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
        return (
          <>
            <Meta title={trip.data.trip.title} />
            <h1 className="flex items-center font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
              {trip.data.trip.title}
              <span className="ml-auto text-sm text-gray-600 text-right">
                {moment(trip.data.trip.startDate).format("DD-MM-YYYY")}
                {" ➡ "}
                {moment(trip.data.trip.endDate).format("DD-MM-YYYY")}
              </span>
            </h1>
            <TripInfo trip={trip.data.trip} />
            <ExpensesList expenses={expenses.data} />
          </>
        );
      }}
    </Queries>
  );
};

export default TripItem;
