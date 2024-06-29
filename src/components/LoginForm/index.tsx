import { FormEvent } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from "./LoginForm.module.css";
import useFormValidation from '../../hooks/useFormValidation';
import useAuthenticateUser from '../../auth/useAuthenticateUser';

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

    const { authenticateUser, error } = useAuthenticateUser();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleEmailSubmit(event);
        handlePasswordSubmit(event);

        if (errorMessageEmail || errorMessagePassword) {
            return;
        }

        await authenticateUser(email, password);
    };

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Bem-vindo(a) à Taqtile!</h1>
            <form className={styles.form} method='post' onSubmit={handleSubmit}>
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
                <Button>
                    Entrar
                </Button>

            </form>
            {error && <p className={styles.error}>ERRO: {error.message}</p>}
        </section>
    );
}

export default LoginForm;
