import gql from "graphql-tag";

export const ME_QUERY = gql`
  query {
    me {
      id
      email
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
      categories {
        id
        name
        color
      }
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
      categories {
        id
        name
        color
      }
      baseCurrency {
        id
        code
        name
        symbol
      }
    }
  }
`;

export const TRIP_CATEGORY_QUERY = gql`
  query tripCategories($tripId: ID!) {
    tripCategories(tripId: $tripId) {
      id
      name
      color
      trip {
        id
        title
      }
    }
  }
`;

export const TRIP_EXPENSE_QUERY = gql`
  query expense($tripId: ID!, $expenseId: ID!) {
    expense(tripId: $tripId, expenseId: $expenseId) {
      id
      title
      amount
      date
      currency {
        id
        code
        name
        symbol
      }
      trip {
        id
        startDate
        endDate
        categories {
          id
          name
          color
        }
      }
      category {
        id
        name
        color
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
        name
        symbol
      }
      trip {
        id
      }
      category {
        id
        name
        color
      }
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query {
    currencies {
      id
      code
      name
      symbol
    }
  }
`;

export const COUNTRIES_QUERY = gql`
  query {
    countries {
      id
      name
      flagEmoji
    }
  }
`;

export default {
  ME_QUERY,
  TRIPS_QUERY,
  TRIP_QUERY,
  TRIP_CATEGORY_QUERY,
  TRIP_EXPENSES_QUERY,
  TRIP_EXPENSE_QUERY,
  CURRENCIES_QUERY,
  COUNTRIES_QUERY
};
