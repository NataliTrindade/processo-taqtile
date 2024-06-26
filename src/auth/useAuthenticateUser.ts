import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/mutations';
import { saveToken } from './authService';

const useAuthenticateUser = () => {
    const [login, { error, loading }] = useMutation(LOGIN_MUTATION);

    const authenticateUser = async (email: string, password: string) => {
        try {
            const response = await login({
                variables: {
                    data: {
                        email,
                        password
                    }
                }
            });
            const token = response.data.login.token;
            saveToken(token);
            return true;
        } catch (error: unknown) {
            if (error) {
                return {
                    error: {
                        data: null,
                        errors: [
                            {
                                message: error
                            }
                        ]
                    }
                };
            }
        }
    };

    return { authenticateUser, error, loading };
};

export default useAuthenticateUser;