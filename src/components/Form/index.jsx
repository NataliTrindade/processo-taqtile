import Button from '../Button';
import Input from '../Input';

const LoginForm = () => {
    return (
        <section>
            <h1>Bem-vindo(a) à Taqtile!</h1>
            <form>
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