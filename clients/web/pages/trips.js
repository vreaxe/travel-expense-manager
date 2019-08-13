import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import { TRIPS_QUERY } from "../graphql/queries";
import TripsList from "../components/TripsList";
import TripsListLoader from "../components/loaders/TripsListLoader";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const Trips = () => {
  const {
    loading,
    error,
    data: { trips }
  } = useQuery(TRIPS_QUERY);

  if (loading) return <TripsListLoader />;
  return (
    <>
      <Meta title={`Trips`} />
      <Header>TRIPS</Header>
      <TripsList trips={trips} />
    </>
  );
};

export default withAuth(Trips);
