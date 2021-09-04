import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';

import Input from '../components/common/Input';
import Notice from '../components/common/Notice';
import { UserDispatchContext } from '../context/UserContext';
import { login } from '../lib/api';
import { FormType } from '../types';

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

  const [formData, setFormData] = useState<FormType>({ email: '', password: '' });

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);
    try {
      const data = await login(formData);
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

  const handlePasswordReset = (e: any) => {
    e.preventDefault();
    router.push('/reset');
  };

  return (
    <>
      <h1 className='pageHeading'>Login</h1>
      <form id={form.id} onSubmit={handleSubmit}>
        {form.inputs.map((input, key) => {
          return (
            <Input
              key={key}
              formId={form.id}
              id={input.id}
              type={input.type}
              label={input.label}
              required={input.required}
              value={formData[input.id]}
              setValue={(value: string) => handleInputChange(input.id, value)}
            />
          );
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Login</button>
        {/* <button type='button' onClick={handlePasswordReset}>
          Forgot password ?
        </button> */}
      </form>
      <p>
        Don&apos;t have an account yet?{' '}
        <Link href='/signup' passHref>
          <strong>Sign up here.</strong>
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
