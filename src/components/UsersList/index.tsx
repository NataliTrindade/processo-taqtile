import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries/queries';

interface User {
  id: string;
  name: string;
  email: string;
}

const UsersList = () => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { offset, limit },
  });

  if (loading && !data) return <p>Loading users...</p>;

  const loadMoreUsers = () => {
    fetchMore({
      variables: {
        offset: offset + limit,
        limit: 10,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          users: {
            nodes: [...prevResult.users.nodes, ...fetchMoreResult.users.nodes],
            pageInfo: fetchMoreResult.users.pageInfo,
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