import { gql } from '@apollo/client';

export const GET_USERS = gql`
 query GetUsers($data: PageInput) {
        users(data: $data) {
            nodes {
              id
              name
              email
            }
        }
    }
`;
