import Meta from "../components/layouts/Meta";
import TripsList from "../components/TripsList";
import withAuth from "../lib/withAuth";

class Trips extends React.Component {
  render() {
    return (
      <div>
        <TripsList />
      </div>
    );
  }
}

export default withAuth(Trips);
