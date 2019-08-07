import { Link } from "../routes";
import TripItem from "../components/TripItem";
import withAuth from "../lib/withAuth";

const Trip = props => {
  return (
    <div>
      <TripItem tripId={props.tripId} />
    </div>
  );
};

Trip.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(Trip);
