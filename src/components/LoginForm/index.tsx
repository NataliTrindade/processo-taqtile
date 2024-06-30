import { FormEvent } from 'react';
import Button from '../Button';
import Input from '../Input';
import useFormValidation from '../../hooks/useFormValidation';
import useAuthenticateUser from '../../auth/useAuthenticateUser';
import { useNavigate } from 'react-router-dom';
import Title from '../../Title';

const LoginForm = () => {
    const {
        value: email,
        onInputChange: setEmail,
        onBlur: validateEmailInput,
        onFormSubmit: handleEmailSubmit,
        errorMessage: errorMessageEmail
    } = useFormValidation('email');

    const {
        value: password,
        onInputChange: setPassword,
        onBlur: validatePasswordInput,
        onFormSubmit: handlePasswordSubmit,
        errorMessage: errorMessagePassword
    } = useFormValidation('password');

    const { authenticateUser, error, loading } = useAuthenticateUser();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleEmailSubmit(event);
        handlePasswordSubmit(event);

        if (errorMessageEmail || errorMessagePassword) {
            return;
        }

        const authenticated = await authenticateUser(email, password);
        if (authenticated === true) {
            navigate('/users');
        }
    };

    return (
        <main className='main h-screen'>
            <Title>Bem-vindo(a) à Taqtile!</Title>
            <form className='form w-10/12 lg:w-2/4' method='post' onSubmit={handleSubmit}>
                <Input
                    id='email'
                    label='Email'
                    name='email'
                    placeholder='Digite seu email'
                    type='email'
                    value={email}
                    required={true}
                    onChange={setEmail}
                    onBlur={validateEmailInput}
                    errorMessage={errorMessageEmail}
                />
                <Input
                    id='password'
                    label='Senha'
                    name='password'
                    placeholder='Digite sua senha'
                    type='password'
                    value={password}
                    required={true}
                    onChange={setPassword}
                    onBlur={validatePasswordInput}
                    errorMessage={errorMessagePassword}
                />
                <Button disabled={loading}>
                    {loading ? "Estamos te conectando..." : 'Entrar'}
                </Button>
                {error && <p className='error text-center'>{error.message}</p>}
            </form>
        </main>
    );
};

export default LoginForm;