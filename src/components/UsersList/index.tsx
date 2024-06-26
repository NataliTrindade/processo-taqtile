import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/querys/querys";

interface User {
  id: string,
  name: string;
  email: string;
}

const UsersList = () => {
  const { data } = useQuery(GET_USERS);

  if (!data) {
    return <p>No users found.</p>;
  }

  return (
    <ul>
      {data.users.nodes.map((user: User) => (
        <li key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;