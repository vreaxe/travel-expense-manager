import { Link } from "../routes";
import withAuth from "../lib/withAuth";

function Dashboard(props) {
  return <div>Welcome to Next.js! - {props.loggedUser.email}</div>;
}

export default withAuth(Dashboard);
