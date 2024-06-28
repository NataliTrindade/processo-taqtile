import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries/queries';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

const UsersList = () => {
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { offset, limit },
  });

  if (loading && !data) return <p>Loading users...</p>;

  const loadMoreUsers = () => {
    fetchMore({
      variables: {
        offset: offset + limit,
        limit: limit,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          users: {
            nodes: [...prevResult.users.nodes, ...fetchMoreResult.users.nodes],
          },
        };
      },
    }).then(fetchMoreResult => {
      if (fetchMoreResult.data) {
        setOffset(offset + fetchMoreResult.data.users.nodes.length);
      }
    });
  };

  return (
    <div>
      <ul>
        {data?.users.nodes.map((user: User) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
      {data?.users.pageInfo.hasNextPage && (
        <button onClick={loadMoreUsers}>
          Load More
        </button>
      )}
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default UsersList;