import React from "react";
import CountryFlag from "./elements/CountryFlag";
import CurrencyNumber from "./elements/CurrencyNumber";

const TripInfo = props => {
  return (
    <div className="flex mb-8">
      <div className="bg-white shadow p-4 mr-3 lg:mr-5 w-1/3 text-center">
        <h3 className="block font-bold text-md mb-1">Daily Avg.</h3>
        <p>
          <CurrencyNumber
            number={props.trip.dailyAvgSpent}
            currency={props.trip.baseCurrency}
          />
        </p>
      </div>
      <div className="bg-white shadow p-4 mx-3 lg:mx-5 w-1/3 text-center">
        <h3 className="block font-bold text-md mb-1">Budget</h3>
        <p>
          <CurrencyNumber
            number={props.trip.totalSpent}
            currency={props.trip.baseCurrency}
          />{" "}
          /{" "}
          <CurrencyNumber
            number={props.trip.budget}
            currency={props.trip.baseCurrency}
          />
        </p>
      </div>
      <div className="bg-white shadow p-4 ml-3 lg:ml-5 w-1/3 text-center">
        <h3 className="block font-bold text-md mb-1">
          {props.trip.countries.length == 1 ? "Country" : "Countries"}
        </h3>
        <p className="break-words">
          {props.trip.countries.map(country => (
            <CountryFlag key={country.id} country={country} />
          ))}
        </p>
      </div>
    </div>
  );
};

export default TripInfo;
