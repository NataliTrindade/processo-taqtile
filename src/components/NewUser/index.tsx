import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations/mutations';
import { useNavigate } from 'react-router-dom';
import { newUserValidationSchema } from '../../utils/inputValidations';
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

const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: any; email: any; phone: any; birthDate: any; password: any; role: any; }, { setSubmitting }: any) => {
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
    <main className='main'>
      <Formik
        className="main"
        initialValues={initialValues}
        validationSchema={newUserValidationSchema}
        onSubmit={handleSubmit}
      >
        <>
          <Title>Criar Usuário</Title>
          <Form className='form mb-10 w-10/12 lg:w-2/4'>
            <div>
              <label htmlFor="name" className='label'>Nome:</label>
              <Field type="text" id="name" name="name" className="input" />
              <ErrorMessage name='name' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="email" className='label'>Email:</label>
              <Field type="email" id="email" name="email" className="input" />
              <ErrorMessage name='email' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="phone" className='label'>Telefone:</label>
              <Field type="text" id="phone" name="phone" className="input" />
              <ErrorMessage name='phone' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="birthDate" className='label'>Data de Nascimento:</label>
              <Field type="date" id="birthDate" name="birthDate" className="input" />
              <ErrorMessage name='birthDate' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="password" className='label'>Senha:</label>
              <Field type="password" id="password" name="password" className="input" />
              <ErrorMessage name='password' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>

            <div>
              <label htmlFor="role" className='label'>Tipo de Usuário:</label>
              <Field className="input" as="select" id="role" name="role" defaultValue="">
                <option value="" disabled>Escolha uma opção</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuário</option>
              </Field>
              <ErrorMessage name='role' render={msg => <span className="error inline-block">{msg}</span>} />
            </div>
            <Button>Criar Usuário</Button>
            {error && <p className="error text-center">{error.message}</p>}
          </Form>
        </>
      </Formik>
    </main>
  );
};

export default NewUser;
