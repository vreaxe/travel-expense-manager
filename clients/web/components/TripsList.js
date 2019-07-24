import React from "react";
import { Query } from "react-apollo";
import TripCard from "./TripCard";
import FAB from "./elements/FAB";
import { Router } from "../routes";
import { TRIPS_QUERY } from "../graphql/queries";

const TripsList = props => {
  return (
    <div className="flex flex-wrap -mx-2">
      <Query query={TRIPS_QUERY}>
        {({ data: { trips }, loading, error }) => {
          if (loading) return "Loading...";
          return (
            <>
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
              <FAB
                onClick={() => Router.pushRoute("addTrip")}
                position={{ bottom: 30, right: 30 }}
                tooltipContent="Add Trip"
              >
                <p className="text-center w-full text-2xl text-white">＋</p>
              </FAB>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default TripsList;
