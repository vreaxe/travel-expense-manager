import Meta from "../components/layouts/Meta";
import TripsList from "../components/TripsList";
import withAuth from "../lib/withAuth";

const Trips = () => {
  return (
    <div>
      <TripsList />
    </div>
  );
};

export default withAuth(Trips);
