import AddEditTripCategoriesForm from "../components/forms/AddEditTripCategoriesForm";
import AddEditTripCategoriesLoader from "../components/loaders/AddEditTripCategoriesLoader";
import BackButton from "../components/elements/BackButton";
import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import React from "react";
import { TRIP_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const TripCategories = props => {
  const { loading: loadingTrip, error: errorTrip, data: dataTrip } = useQuery(
    TRIP_QUERY,
    {
      variables: { id: props.tripId }
    }
  );

  if (loadingTrip) return <AddEditTripCategoriesLoader />;

  return (
    <>
      <Meta title={`Add/Edit Categories: ${dataTrip.trip.title}`} />
      <Header>
        <div className="flex items-center truncate">
          <BackButton routeName="trip" routeParams={{ id: dataTrip.trip.id }} />
          Add/Edit Categories: {dataTrip.trip.title}
        </div>
      </Header>
      <AddEditTripCategoriesForm
        tripId={dataTrip.trip.id}
        categories={dataTrip.trip.categories}
      />
    </>
  );
};

TripCategories.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(TripCategories);
