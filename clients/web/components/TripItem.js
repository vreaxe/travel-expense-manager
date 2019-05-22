import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import moment from "moment";
import Meta from "./layouts/Meta";
import ExpensesList from "./ExpensesList";
import TripInfo from "./TripInfo";

const TRIP_QUERY = gql`
  query trip($id: ID!) {
    trip(id: $id) {
      title
      budget
      startDate
      endDate
      dailyAvgSpent
      totalSpent
      countries {
        id
        name
        flagEmoji
      }
      baseCurrency {
        code
        symbol
      }
    }
  }
`;

const TRIP_EXPENSES_QUERY = gql`
  query expenses($tripId: ID!) {
    expenses(tripId: $tripId) {
      id
      title
      amount
      date
      currency {
        id
        code
        symbol
      }
    }
  }
`;

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
