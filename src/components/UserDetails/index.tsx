import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_DETAILS } from "../../graphql/queries/queries";

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();

    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
        variables: { id }
    });

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!data || !data.user) {
        return <p>Dados do usuário não encontrados.</p>;
    }

    const { user } = data;

    return (
        <div>
            <p>Data de Nascimento: {user.birthDate}</p>
            <p>Email: {user.email}</p>
            <p>Nome: {user.name}</p>
            <p>Telefone: {user.phone}</p>
            <p>Função: {user.role}</p>
        </div>
    );
};

export default UserDetails;
