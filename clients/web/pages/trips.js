import { Action, Fab } from "react-tiny-fab";
import { useEffect, useState } from "react";

import Header from "../components/elements/Header";
import Meta from "../components/layouts/Meta";
import { Router } from "../routes";
import { TRIPS_QUERY } from "../graphql/queries";
import TripsList from "../components/TripsList";
import TripsListLoader from "../components/loaders/TripsListLoader";
import { isMobileOrTablet as isMobileOrTabletFn } from "../lib/utils";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const Trips = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const {
    loading,
    error,
    data: { trips }
  } = useQuery(TRIPS_QUERY);

  useEffect(() => {
    setIsMobileOrTablet(isMobileOrTabletFn());
  });

  if (loading) return <TripsListLoader />;
  return (
    <>
      <Meta title={`Trips`} />
      <Header>TRIPS</Header>
      <TripsList trips={trips} />
      <Fab
        icon={<span>＋</span>}
        position={{ bottom: 10, right: 10 }}
        mainButtonStyles={{ backgroundColor: "#48bb78" }}
        event={isMobileOrTablet ? "click" : "hover"}
      >
        <Action
          text="Add Trip"
          style={{ backgroundColor: "#fff" }}
          onClick={() => Router.pushRoute("addTrip")}
        >
          <span className="emoji">✈️</span>
        </Action>
      </Fab>
    </>
  );
};

export default withAuth(Trips);
