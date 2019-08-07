import { COUNTRIES_QUERY, CURRENCIES_QUERY } from "../graphql/queries";

import AddTripForm from "../components/forms/AddTripForm";
import AddTripLoader from "../components/loaders/AddTripLoader";
import BackButton from "../components/elements/BackButton";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const AddTrip = props => {
  const {
    loadingCountries,
    errorCountries,
    data: { countries }
  } = useQuery(COUNTRIES_QUERY);
  const {
    loadingCurrencies,
    errorCurrencies,
    data: { currencies }
  } = useQuery(CURRENCIES_QUERY);

  if (loadingCountries || loadingCurrencies) return <AddTripLoader />;

  return (
    <>
      <Meta title={`Add trip`} />
      <Header>
        <BackButton routeName="trips" />
        ADD TRIP
      </Header>
      <AddTripForm countries={countries} currencies={currencies} />
    </>
  );
};

export default withAuth(AddTrip);
