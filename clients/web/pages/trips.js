import { Link } from "../routes";
import withAuth from "../lib/withAuth";
import TripsList from "../components/TripsList";

function Trips(props) {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500">
        TRIPS
      </h1>
      <TripsList />
    </div>
  );
}

export default withAuth(Trips);
