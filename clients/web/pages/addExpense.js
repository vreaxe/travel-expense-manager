import React from "react";
import { Query } from "react-apollo";
import { Router } from "../routes";
import withAuth from "../lib/withAuth";
import Meta from "../components/layouts/Meta";
import { TRIP_QUERY } from "../graphql/queries";
import AddExpenseForm from "../components/forms/AddExpenseForm";
import BackButton from "../components/elements/BackButton";

class AddExpense extends React.Component {
  static async getInitialProps({ query }) {
    return { tripId: query.id };
  }

  render() {
    return (
      <>
        <Query query={TRIP_QUERY} variables={{ id: this.props.tripId }}>
          {({ data: { trip }, loading, error }) => {
            return (
              <>
                <Meta title={`Add Expense to ${trip.title}`} />
                <h1 className="flex items-center font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase">
                  <BackButton routeName="trip" routeParams={{ id: trip.id }} />
                  ADD EXPENSE TO {trip.title}
                </h1>
                <AddExpenseForm trip={trip} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default withAuth(AddExpense);
