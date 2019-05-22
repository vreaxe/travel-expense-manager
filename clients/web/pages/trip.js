import { Link } from "../routes";
import withAuth from "../lib/withAuth";
import TripItem from "../components/TripItem";

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
