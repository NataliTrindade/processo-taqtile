import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      birthDate
      email
      name
      phone
      role
    }
  }
`;
