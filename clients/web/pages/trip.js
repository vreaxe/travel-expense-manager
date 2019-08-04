import { Link } from "../routes";
import TripItem from "../components/TripItem";
import withAuth from "../lib/withAuth";

class Trip extends React.Component {
  static async getInitialProps({ query }) {
    return { tripId: query.id };
  }

  render() {
    return (
      <div>
        <TripItem tripId={this.props.tripId} />
      </div>
    );
  }
}

export default withAuth(Trip);
