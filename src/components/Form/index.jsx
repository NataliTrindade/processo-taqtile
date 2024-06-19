import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from "./Form.module.css";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
    }

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Bem-vindo(a) à Taqtile!</h1>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <Input
                    id='email'
                    label='Email'
                    name='email'
                    placeholder='Digite seu email'
                    type='email'
                    value={email}
                    required={true}
                    onChange={(value) => setEmail(value)}
                />
                <Input
                    id='password'
                    label='Senha'
                    name='password'
                    placeholder='Digite sua senha'
                    type='password'
                    value={password}
                    required={true}
                    onChange={(value) => setPassword(value)}
                />
                <Button>Entrar</Button>
            </form>
        </section>
    )
}

export default LoginForm;