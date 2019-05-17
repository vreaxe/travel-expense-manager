import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Card = props => {
  return (
    <div className="w-1/3 px-2">
      <div className="px-6 py-4 mb-5 shadow bg-white overflow-hidden">
        <div className="font-bold text-xl mb-1">{props.trip.title}</div>
        <div className="mb-1">
          {props.trip.countries.map(country => {
            return <span className="mr-1">{country.flagEmoji}</span>;
          })}
        </div>
        <p className="text-sm text-gray-600">
          {moment(props.trip.startDate).format("DD-MM-YYYY")}
          {" ➡ "}
          {moment(props.trip.endDate).format("DD-MM-YYYY")}
        </p>
      </div>
    </div>
  );
};

export default Card;
