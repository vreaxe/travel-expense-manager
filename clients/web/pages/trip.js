import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";

import BackButton from "../components/elements/BackButton";
import Header from "../components/elements/Header";
import { Link } from "../routes";
import Meta from "../components/layouts/Meta";
import NoItems from "../components/NoItems";
import TripItem from "../components/TripItem";
import TripItemLoader from "../components/loaders/TripItemLoader";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const Trip = props => {
  const {
    loading: loadingTrip,
    error: errorTrip,
    data: { trip }
  } = useQuery(TRIP_QUERY, {
    variables: { id: props.tripId }
  });
  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: { expenses }
  } = useQuery(TRIP_EXPENSES_QUERY, { variables: { tripId: props.tripId } });

  if (loadingTrip || loadingExpenses) {
    return <TripItemLoader />;
  }

  if (typeof expenses === "undefined" || typeof trip === "undefined") {
    return <NoItems itemName="trip" />;
  }

  return (
    <>
      <Meta title={trip.title} />
      <Header>
        <div className="w-3/4 flex items-center">
          <BackButton routeName="trips" />
          <span style={{ width: "80%" }} className="truncate">
            {trip.title}
          </span>
        </div>
        <div className="w-1/4">
          <span className="block w-full text-sm text-gray-600 text-right">
            {moment(trip.startDate).format("DD-MM-YYYY")}
            {" ➡ "}
            {moment(trip.endDate).format("DD-MM-YYYY")}
          </span>
        </div>
      </Header>
      <TripItem trip={trip} expenses={expenses} />
    </>
  );
};

Trip.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(Trip);
