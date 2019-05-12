import { Link } from "../routes";

function Home() {
  return <div>Welcome to Next.js! - Env var.: {process.env.GRAPHQL_URL}</div>;
}

export default Home;
