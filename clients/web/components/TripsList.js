import React from "react";
import Card from "./Card";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const TRIPS_QUERY = gql`
  query {
    trips {
      id
      title
      budget
      startDate
      endDate
      countries {
        name
        flagEmoji
      }
    }
  }
`;

class TripsList extends React.Component {
  render() {
    return (
      <div class="flex flex-wrap -mx-2">
        <Query query={TRIPS_QUERY}>
          {({ data: { trips }, loading, error }) => {
            return (
              <React.Fragment>
                {trips.map(trip => (
                  <Card trip={trip} />
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default TripsList;
