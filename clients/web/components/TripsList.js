import React from "react";
import TripCard from "./TripCard";

const TripsList = ({ trips }) => {
  return (
    <>
      <div className="flex flex-wrap -mx-2">
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </>
  );
};

export default TripsList;
