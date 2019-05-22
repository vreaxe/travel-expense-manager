import React from "react";

const TripInfo = props => {
  return (
    <div className="flex mb-8">
      <div className="bg-white shadow p-4 mr-5 w-1/3 text-center">
        <h3 className="block font-bold text-md">Daily Avg.</h3>
        <p>
          {props.trip.dailyAvgSpent}&nbsp;
          {props.trip.baseCurrency.symbol}
        </p>
      </div>
      <div className="bg-white shadow p-4 mx-5 w-1/3 text-center">
        <h3 className="block font-bold text-md">Budget</h3>
        <p>
          {props.trip.totalSpent}&nbsp;{props.trip.baseCurrency.symbol}
        </p>
      </div>
      <div className="bg-white shadow p-4 ml-5 w-1/3 text-center">
        <h3 className="block font-bold text-md">
          {props.trip.countries.length == 1 ? "Country" : "Countries"}
        </h3>
        <p>{props.trip.countries.map(country => country.flagEmoji)}</p>
      </div>
    </div>
  );
};

export default TripInfo;
