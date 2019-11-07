import { COUNTRIES_QUERY, TRIP_QUERY } from "../graphql/queries";

import BackButton from "../components/elements/BackButton";
import EditTripForm from "../components/forms/EditTripForm";
import EditTripLoader from "../components/loaders/EditTripLoader";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const EditTrip = props => {
  const { loading: loadingTrip, error: errorTrip, data: dataTrip } = useQuery(
    TRIP_QUERY,
    {
      variables: { id: props.tripId }
    }
  );
  const {
    loading: loadingCountries,
    error: errorCountries,
    data: dataCountries
  } = useQuery(COUNTRIES_QUERY);

  if (loadingTrip || loadingCountries) return <EditTripLoader />;

  return (
    <>
      <Meta title={`Edit Trip: ${dataTrip.trip.title}`} />
      <Header>
        <BackButton routeName="trip" routeParams={{ id: dataTrip.trip.id }} />
        Edit Trip: {dataTrip.trip.title}
      </Header>
      <EditTripForm trip={dataTrip.trip} countries={dataCountries.countries} />
    </>
  );
};

EditTrip.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(EditTrip);
