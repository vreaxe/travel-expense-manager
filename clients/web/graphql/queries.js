import { gql } from "apollo-boost";

export const ME_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;

export const TRIP_QUERY = gql`
  query trip($id: ID!) {
    trip(id: $id) {
      id
      title
      budget
      startDate
      endDate
      dailyAvgSpent
      totalSpent
      countries {
        id
        name
        flagEmoji
        currencies {
          id
          name
          symbol
        }
      }
      baseCurrency {
        code
        symbol
      }
    }
  }
`;

export const TRIP_EXPENSES_QUERY = gql`
  query expenses($tripId: ID!) {
    expenses(tripId: $tripId) {
      id
      title
      amount
      date
      currency {
        id
        code
        symbol
      }
    }
  }
`;

export const TRIPS_QUERY = gql`
  query {
    trips {
      id
      title
      budget
      startDate
      endDate
      countries {
        id
        name
        flagEmoji
      }
    }
  }
`;

export default { ME_QUERY, TRIPS_QUERY, TRIP_QUERY, TRIP_EXPENSES_QUERY };
