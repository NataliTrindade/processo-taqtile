import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations/mutations';
import { useNavigate } from 'react-router-dom';
import Title from '../../Title';
import Button from '../Button';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  password: '',
  role: ''
};

interface FormValues  {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  role: string;
};

const requiredMessage = 'O campo é obrigatório.';
const emailMessage = 'Por favor, insira um endereço de e-mail válido.';
const passwordMessage = 'A senha deve conter pelo menos uma letra e um número.';
export const newUserValidationSchema = Yup.object().shape({
  name: Yup.string()
      .required(requiredMessage),

  email: Yup.string()
      .email(emailMessage)
      .required(requiredMessage),

  phone: Yup.string()
      .required(requiredMessage),

  birthDate: Yup.date()
      .required(requiredMessage),

  password: Yup.string()
      .min(7, passwordMessage)
      .required(requiredMessage)
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, passwordMessage),

  role: Yup.string()
      .required(requiredMessage),
});

const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const { data } = await createUser({
        variables: {
          data: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            birthDate: values.birthDate,
            password: values.password,
            role: values.role
          }
        }
      });

      if (data.createUser) {
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
      <Formik
        initialValues={initialValues}
        validationSchema={newUserValidationSchema}
        onSubmit={handleSubmit}
      >
        <>
          <Title>Criar Usuário</Title>
          <Form className='custom-form'>
            <div>
              <label htmlFor="name" className='custom-label'>Nome:</label>
              <Field type="text" id="name" name="name" className="custom-input" />
              <ErrorMessage name='name' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="email" className='custom-label'>Email:</label>
              <Field type="email" id="email" name="email" className="custom-input" />
              <ErrorMessage name='email' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="phone" className='custom-label'>Telefone:</label>
              <Field type="text" id="phone" name="phone" className="custom-input" />
              <ErrorMessage name='phone' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="birthDate" className='custom-label'>Data de Nascimento:</label>
              <Field type="date" id="birthDate" name="birthDate" className="custom-input" />
              <ErrorMessage name='birthDate' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="password" className='custom-label'>Senha:</label>
              <Field type="password" id="password" name="password" className="custom-input" />
              <ErrorMessage name='password' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="role" className='custom-label'>Tipo de Usuário:</label>
              <Field className="custom-input" as="select" id="role" name="role" defaultValue="">
                <option value="" disabled>Escolha uma opção</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuário</option>
              </Field>
              <ErrorMessage name='role' render={msg => <span className="custom-error inline-block">{msg}</span>} />
            </div>
            <Button>Criar Usuário</Button>
            {error && <p className="custom-error text-center">{error.message}</p>}
          </Form>
        </>
      </Formik>
    </main>
  );
};

export default NewUser;
