import gql from "graphql-tag";

export const TOKEN_AUTH_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
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
  mutation updateExpense($id: ID!, $input: UpdateExpenseInput!) {
    updateExpense(id: $id, input: $input) {
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

export const CREATE_TRIP_MUTATION = gql`
  mutation createTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
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

export default {
  TOKEN_AUTH_MUTATION,
  CREATE_EXPENSE_MUTATION,
  UPDATE_EXPENSE_MUTATION,
  CREATE_TRIP_MUTATION,
  DELETE_TRIP_MUTATION
};
