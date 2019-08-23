import CountryFlag from "./elements/CountryFlag";
import { DELETE_TRIP_MUTATION } from "../graphql/mutations";
import { Link } from "../routes";
import React from "react";
import { TRIPS_QUERY } from "../graphql/queries";
import Trash from "./elements/Trash";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";

const TripCard = props => {
  const [deleteTrip, { loading, error }] = useMutation(DELETE_TRIP_MUTATION, {
    variables: {
      id: props.trip.id
    },
    refetchQueries: [{ query: TRIPS_QUERY }]
  });

  return (
    <div className="trip-card w-full md:w-1/2 xl:w-1/3 px-2">
      <div className="mb-5 shadow bg-white overflow-hidden">
        <Link route="trip" params={{ id: props.trip.id }}>
          <a className="p-6 block">
            <div className="font-bold text-xl mb-1">{props.trip.title}</div>
            <div className="mb-1 truncate">
              {props.trip.countries.map(country => {
                return <CountryFlag key={country.id} country={country} />;
              })}
            </div>
            <p className="text-sm text-gray-600">
              <span>
                {moment(props.trip.startDate).format("DD-MM-YYYY")}
                {" ➡ "}
                {moment(props.trip.endDate).format("DD-MM-YYYY")}
              </span>
              <Trash
                className="float-right"
                loading={loading}
                onClick={e => {
                  e.preventDefault();
                  deleteTrip();
                }}
              />
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TripCard;
