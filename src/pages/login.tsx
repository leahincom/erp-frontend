import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';

import Input from '../components/Input';
import Notice from '../components/Notice';
import { UserDispatchContext } from '../context/UserContext';

const form = {
  id: 'login',
  inputs: [
    {
      id: 'email',
      type: 'email',
      label: 'E-Mail Address',
      required: true,
      value: '',
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      value: '',
    },
  ],
};

const LoginPage = () => {
  const RESET_NOTICE = { type: '', message: '' };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const dispatch = useContext(UserDispatchContext);
  const router = useRouter();

  let values: any;
  form.inputs.forEach((input) => (values[input.id] = input.value));
  const [formData, setFormData] = useState(values);

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }).then((res) => res.json());

      if (data.errcode) {
        setNotice({ type: 'ERROR', message: data.message });
      } else {
        dispatch({ type: 'LOGIN' });
        router.push('/pages');
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
      dispatch({ type: 'LOGOUT' });
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    router.push('/reset');
  };

  return (
    <>
      <h1 className='pageHeading'>Login</h1>
      <form id={form.id} onSubmit={handleSubmit}>
        {form.inputs.map((input, key) => {
          <Input
            key={key}
            formId={form.id}
            id={input.id}
            type={input.type}
            label={input.label}
            required={input.required}
            value={formData[input.id]}
            setValue={(value: string) => handleInputChange(input.id, value)}
          />;
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Login</button>
        <button type='button' onClick={handlePasswordReset}>
          Forgot password ?
        </button>
      </form>
      <p>
        Don't have an account yet?{' '}
        <Link href='/signup' passHref>
          <strong>Sign up here.</strong>
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
