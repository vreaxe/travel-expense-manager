import React from "react";
import TripCard from "./TripCard";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const TRIPS_QUERY = gql`
  query {
    trips {
      id
      title
      budget
      startDate
      endDate
      countries {
        id
        name
        flagEmoji
      }
    }
  }
`;

const TripsList = props => {
  return (
    <div className="flex flex-wrap -mx-2">
      <Query query={TRIPS_QUERY}>
        {({ data: { trips }, loading, error }) => {
          return (
            <>
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default TripsList;
