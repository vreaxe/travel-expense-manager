import withAuth from "../lib/withAuth";
import TripsList from "../components/TripsList";
import Meta from "../components/layouts/Meta";

class Trips extends React.Component {
  render() {
    return (
      <div>
        <Meta title={`Trips`} />
        <h1 className="font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
          TRIPS
        </h1>
        <TripsList />
      </div>
    );
  }
}

export default withAuth(Trips);
