import React from "react";
import TripCard from "./TripCard";
import { Query } from "react-apollo";
import { TRIPS_QUERY } from "../graphql/queries";

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
