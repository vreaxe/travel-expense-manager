import React from "react";
import moment from "moment";
import { Link } from "../routes";

const TripCard = props => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-2">
      <div className="mb-5 shadow bg-white overflow-hidden">
        <Link route="trip" params={{ id: props.trip.id }}>
          <a className="p-6 block">
            <div className="font-bold text-xl mb-1">{props.trip.title}</div>
            <div className="mb-1">
              {props.trip.countries.map(country => {
                return (
                  <span key={country.id} className="mr-1">
                    {country.flagEmoji}
                  </span>
                );
              })}
            </div>
            <p className="text-sm text-gray-600">
              {moment(props.trip.startDate).format("DD-MM-YYYY")}
              {" ➡ "}
              {moment(props.trip.endDate).format("DD-MM-YYYY")}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TripCard;
