import FAB from "./elements/FAB";
import Header from "./elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { Router } from "../routes";
import { TRIPS_QUERY } from "../graphql/queries";
import TripCard from "./TripCard";
import TripsListLoader from "./loaders/TripsListLoader";
import { useQuery } from "@apollo/react-hooks";

const TripsList = props => {
  const {
    loading,
    error,
    data: { trips }
  } = useQuery(TRIPS_QUERY);

  if (loading) return <TripsListLoader />;

  return (
    <>
      <Meta title={`Trips`} />
      <Header>TRIPS</Header>
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
};

export default TripsList;
