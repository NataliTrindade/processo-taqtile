import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($offset: Int!, $limit: Int!) {
    users(data: { offset: $offset, limit: $limit }) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      name
      email
      phone
      birthDate
      role
    }
  }
`; 
