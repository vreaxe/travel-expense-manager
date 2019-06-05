import { gql } from "apollo-boost";

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

export default { TOKEN_AUTH_MUTATION, CREATE_EXPENSE_MUTATION };
