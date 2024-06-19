import Button from '../Button';
import Input from '../Input';
import styles from "./Form.module.css";

const LoginForm = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Bem-vindo(a) à Taqtile!</h1>
            <form className={styles.form}>
                <Input
                    id='email'
                    label='Email'
                    name='email'
                    placeholder='Digite seu email'
                    type='email'
                    required={true}
                />
                <Input
                    id='password'
                    label='Senha'
                    name='password'
                    placeholder='Digite sua senha'
                    type='password'
                    required={true}
                />
                <Button>Entrar</Button>
            </form>
        </section>
    )
}

export default LoginForm;