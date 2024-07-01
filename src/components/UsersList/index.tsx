import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries/queries';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Title from '../../Title';

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
  const navigate = useNavigate();

  if (loading && !data) return <p className='text-center m-4'>Carregando usuários...</p>;

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

  const navigateToAddUser = () => navigate('/add-user');
  const navigateToUserDetails = (userId: string) => navigate(`/user-details/${userId}`);

  return (
    <main className='main w-full'>
      <Title>Usuários</Title>
      <ul className='flex flex-col gap-6 w-10/12 lg:w-2/4'>
        {data?.users.nodes.map((user: User) => (
          <li className="shadow-lg p-4 hover:cursor-pointer hover:shadow-purple-200 rounded-lg"
            key={user.id} onClick={() => navigateToUserDetails(user.id)}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
      <div className='w-10/12 lg:w-2/4 flex flex-col lg:flex-row gap-0 lg:gap-4 mt-3'>
        {data?.users.pageInfo.hasNextPage && (
          <Button onClick={loadMoreUsers}>Ver Mais</Button>
        )}
        {loading && <p>Carregando...</p>}
        <Button onClick={navigateToAddUser}>Adicionar Usuário</Button>
      </div>
    </main>
  );
};

export default UsersList;