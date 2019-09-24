import gql from "graphql-tag";

export const TOKEN_AUTH_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser($input: AuthenticationUserInput!) {
    registerUser(input: $input) {
      token
    }
  }
`;

export const CREATE_TRIP_MUTATION = gql`
  mutation createTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      trip {
        id
      }
    }
  }
`;

export const UPDATE_TRIP_MUTATION = gql`
  mutation updateTrip($id: ID!, $input: UpdateTripInput!) {
    updateTrip(id: $id, input: $input) {
      trip {
        id
      }
    }
  }
`;

export const DELETE_TRIP_MUTATION = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id) {
      id
    }
  }
`;

export const CREATE_EXPENSE_MUTATION = gql`
  mutation createExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      expense {
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
  }
`;

export const UPDATE_EXPENSE_MUTATION = gql`
  mutation updateExpense(
    $tripId: ID!
    $expenseId: ID!
    $input: UpdateExpenseInput!
  ) {
    updateExpense(tripId: $tripId, expenseId: $expenseId, input: $input) {
      expense {
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
  }
`;

export const DELETE_EXPENSE_MUTATION = gql`
  mutation deleteExpense($expenseId: ID!, $tripId: ID!) {
    deleteExpense(expenseId: $expenseId, tripId: $tripId) {
      id
    }
  }
`;

export default {
  TOKEN_AUTH_MUTATION,
  REGISTER_USER_MUTATION,
  CREATE_EXPENSE_MUTATION,
  UPDATE_EXPENSE_MUTATION,
  CREATE_TRIP_MUTATION,
  DELETE_TRIP_MUTATION
};
