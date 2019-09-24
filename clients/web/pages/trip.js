import { Action, Fab } from "react-tiny-fab";
import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";

import BackButton from "../components/elements/BackButton";
import Header from "../components/elements/Header";
import { Link } from "../routes";
import Meta from "../components/layouts/Meta";
import NoItems from "../components/NoItems";
import { Router } from "../routes";
import TripItem from "../components/TripItem";
import TripItemLoader from "../components/loaders/TripItemLoader";
import { isMobileOrTablet as isMobileOrTabletFn } from "../lib/utils";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import withAuth from "../lib/withAuth";

const Trip = props => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const { loading: loadingTrip, error: errorTrip, data: dataTrip } = useQuery(
    TRIP_QUERY,
    {
      variables: { id: props.tripId }
    }
  );
  const {
    loading: loadingExpenses,
    error: errorExpenses,
    data: dataExpenses
  } = useQuery(TRIP_EXPENSES_QUERY, { variables: { tripId: props.tripId } });

  useEffect(() => {
    setIsMobileOrTablet(isMobileOrTabletFn());
  });

  if (loadingTrip || loadingExpenses) {
    return <TripItemLoader />;
  }

  if (
    typeof dataExpenses.expenses === "undefined" ||
    typeof dataTrip.trip === "undefined"
  ) {
    return <NoItems itemName="trip" />;
  }

  return (
    <>
      <Meta title={dataTrip.trip.title} />
      <Header>
        <div className="w-3/4 flex items-center">
          <BackButton routeName="trips" />
          <span style={{ width: "80%" }} className="truncate">
            {dataTrip.trip.title}
          </span>
        </div>
        <div className="w-1/4">
          <span className="block w-full text-sm text-gray-600 text-right">
            {moment(dataTrip.trip.startDate).format("DD-MM-YYYY")}
            {" ➡ "}
            {moment(dataTrip.trip.endDate).format("DD-MM-YYYY")}
          </span>
        </div>
      </Header>
      <TripItem trip={dataTrip.trip} expenses={dataExpenses.expenses} />
      <Fab
        icon={<span>＋</span>}
        position={{ bottom: 10, right: 10 }}
        mainButtonStyles={{ backgroundColor: "#48bb78" }}
        event={isMobileOrTablet ? "click" : "hover"}
      >
        <Action
          text="Add Expense"
          style={{ backgroundColor: "#fff" }}
          onClick={() =>
            Router.pushRoute("addExpense", { id: dataTrip.trip.id })
          }
        >
          <span className="emoji">💸</span>
        </Action>
        <Action
          text="Edit Trip"
          style={{ backgroundColor: "#fff" }}
          onClick={() => Router.pushRoute("editTrip", { id: dataTrip.trip.id })}
        >
          <span className="emoji">✏️</span>
        </Action>
      </Fab>
    </>
  );
};

Trip.getInitialProps = ({ query }) => {
  return { tripId: query.id };
};

export default withAuth(Trip);
