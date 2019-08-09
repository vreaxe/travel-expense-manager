import CountryFlag from "./elements/CountryFlag";
import CurrencyNumber from "./elements/CurrencyNumber";
import React from "react";

const TripInfo = props => {
  const percentageSpent = (props.trip.totalSpent * 100) / props.trip.budget;
  let progressColorSpent = "bg-green-500";
  if (percentageSpent > 75 && percentageSpent < 90) {
    progressColorSpent = "bg-orange-500";
  } else if (percentageSpent > 90) {
    progressColorSpent = "bg-red-500";
  }

  return (
    <div className="flex mb-8">
      <div className="flex items-center justify-center flex-col flex-no-wrap bg-white shadow p-4 mr-3 lg:mr-5 w-1/3 text-center">
        <h3 className="block font-bold text-md mb-1">Daily Avg.</h3>
        <p>
          <CurrencyNumber
            number={props.trip.dailyAvgSpent}
            currency={props.trip.baseCurrency}
          />
        </p>
      </div>
      <div className="flex items-center justify-center flex-col flex-no-wrap bg-white shadow p-4 mx-3 lg:mx-5 w-1/3 text-center">
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
        <div style={{ height: "3px" }} className="w-full mt-1 bg-gray-400">
          <span
            className={"block h-full " + progressColorSpent}
            style={{
              width: percentageSpent > 100 ? "100%" : percentageSpent + "%"
            }}
          >
            &nbsp;
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col flex-no-wrap bg-white shadow p-4 ml-3 lg:ml-5 w-1/3 text-center">
        <h3 className="block font-bold text-md mb-1">
          {props.trip.countries.length == 1 ? "Country" : "Countries"}
        </h3>
        <div className="break-words w-full">
          {props.trip.countries.map(country => (
            <CountryFlag key={country.id} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
