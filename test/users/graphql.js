const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          name,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      name
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        id
        name
        lastName
        email
        password
      }
    }
  `,
  variables: { userInput }
});

const logIn = logInInput => ({
  mutation: gql`
    mutation logIn($logInInput: LogInInput!) {
      logIn(user: $logInInput) {
        accessToken
        expiresIn
      }
    }
  `,
  variables: { logInInput }
});

module.exports = { getUser, getUsers, createUser, logIn };
