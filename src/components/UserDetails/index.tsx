import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_DETAILS } from "../../graphql/queries/queries";
import Button from "../Button";
import Title from "../../Title";
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
        variables: { id }
    });

    if (loading) return <p className="text-center my-40">Carregando...</p>;
    if (error) return <p className="text-center my-40">{error.message}</p>;
    if (!data || !data.user) {
        return <p className="text-center my-40">Dados do usuário não encontrados.</p>;
    }

    const { user } = data;

    const navigateToUsers = () => navigate('/users');

    return (
        <main className="main mx-0 min-h-screen">
            <Title>Detalhes do Usuário</Title>
            <div className="w-10/12 lg:w-2/4 mx-0">
                <p className="user-item-details">
                    <span className="font-bold mb-2 lg:mb-0">Data de Nascimento:</span>
                    <span>{user.birthDate}</span>
                </p>
                <p className="user-item-details">
                    <span className="font-bold mb-2 lg:mb-0">Email:</span>
                    <span>{user.email}</span>
                </p>
                <p className="user-item-details">
                    <span className="font-bold mb-2 lg:mb-0">Nome:</span>
                    <span>{user.name}</span>
                </p>
                <p className="user-item-details">
                    <span className="font-bold mb-2 lg:mb-0">Telefone:</span>
                    <span>{user.phone}</span>
                </p>
                <p className="user-item-details mb-0">
                    <span className="font-bold">Função:</span>
                    <span>{user.role}</span>
                </p>
                <Button onClick={navigateToUsers}>Voltar</Button>
            </div>
        </main>
    );
};

export default UserDetails;
