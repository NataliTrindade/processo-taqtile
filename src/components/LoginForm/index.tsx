import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../Button';
import useAuthenticateUser from '../../auth/useAuthenticateUser';
import { useNavigate } from 'react-router-dom';
import Title from '../../Title';

const initialValues = {
    email: '',
    password: ''
}

interface FormValues {
    email: string,
    password: string
}
const requiredMessage = 'O campo é obrigatório.';
const emailMessage = 'Por favor, insira um endereço de e-mail válido.';
const passwordMessage = 'Por favor, insira uma senha válida.';

export const inputsLoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .required(requiredMessage)
        .email(emailMessage),

    password: Yup.string()
        .min(7, passwordMessage)
        .required(requiredMessage)
});

const LoginForm = () => {
    const { authenticateUser, error, loading } = useAuthenticateUser();
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        try{
            const authenticated = await authenticateUser(values.email, values.password);
        if (authenticated === true) {
            navigate('/users');
        }
        } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
    };

    return (
        <main className='custom-main'>
            <Title>Bem-vindo(a) à Taqtile!</Title>
            <Formik
                initialValues={initialValues}
                validationSchema={inputsLoginFormSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSubmit}>
                <>
                    <Form className='custom-form'>
                        <div>
                            <label htmlFor="email" className='custom-label'>Email:</label>
                            <Field type="text" id="email" name="email" className="custom-input" />
                            <ErrorMessage name='email' render={error => <span className="custom-error inline-block">{error}</span>} />
                        </div>
                        <div>
                            <label htmlFor="password" className='custom-label'>Senha:</label>
                            <Field type="password" id="password" name="password" className="custom-input" />
                            <ErrorMessage name='password' render={msg => <span className="custom-error inline-block">{msg}</span>} />
                        </div>
                        <Button disabled={loading}>
                            {loading ? "Estamos te conectando..." : 'Entrar'}
                        </Button>
                        {error && <p className='cutom-error text-center'>{error.message}</p>}
                    </Form>
                </>
            </Formik>
        </main>
    );
};

export default LoginForm;