import React from "react";
import { Query } from "react-apollo";
import TripCard from "./TripCard";
import FAB from "./elements/FAB";
import { Router } from "../routes";
import Meta from "../components/layouts/Meta";
import { TRIPS_QUERY } from "../graphql/queries";
import TripsListLoader from "./loaders/TripsListLoader";

const TripsList = props => {
  return (
    <Query query={TRIPS_QUERY}>
      {({ data: { trips }, loading, error }) => {
        if (loading) return <TripsListLoader />;
        return (
          <>
            <Meta title={`Trips`} />
            <h1 className="font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
              TRIPS
            </h1>
            <div className="flex flex-wrap -mx-2">
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
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
  );
};

export default TripsList;
