import withAuth from "../lib/withAuth";
import TripsList from "../components/TripsList";
import Meta from "../components/layouts/Meta";

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
