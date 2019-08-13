import FAB from "./elements/FAB";
import React from "react";
import { Router } from "../routes";
import TripCard from "./TripCard";

const TripsList = ({ trips }) => {
  return (
    <>
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
