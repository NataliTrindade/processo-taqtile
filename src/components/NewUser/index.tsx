import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations/mutations';
import { useNavigate } from 'react-router-dom';
import { newUserValidationSchema } from '../../utils/inputValidations';

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
    <Formik
      initialValues={initialValues}
      validationSchema={newUserValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Nome:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" />
        </div>

        <div>
          <label htmlFor="phone">Telefone:</label>
          <Field type="text" id="phone" name="phone" />
          <ErrorMessage name="phone" />
        </div>

        <div>
          <label htmlFor="birthDate">Data de Nascimento:</label>
          <Field type="date" id="birthDate" name="birthDate" />
          <ErrorMessage name="birthDate" />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" />
        </div>

        <div>
          <label htmlFor="role">Tipo de Usuário:</label>
          <Field as="select" id="role" name="role" defaultValue="">
            <option value="" disabled>Escolha uma opção</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </Field>
          <ErrorMessage name="role" />
        </div>

        <button type="submit" disabled={loading}>
          Criar Usuário
        </button>

        {error && <p>{error.message}</p>}
      </Form>
    </Formik>
  );
};

export default NewUser;
