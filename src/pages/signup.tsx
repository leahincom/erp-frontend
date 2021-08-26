import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

import Input from '../components/Input';
import Notice from '../components/Notice';
import { UserDispatchContext } from '../context/UserContext';

const form = {
  id: 'signup',
  inputs: [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      value: '',
    },
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

const SinupPage = () => {
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
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }).then((res) => res.json());

      if (data.errCode) {
        setNotice({ type: 'ERROR', message: data.message });
      } else {
        dispatch({ type: 'LOGIN' });
        setNotice({
          type: 'SUCCESS',
          message: 'Success! Check your inbox to confirm your email. You will now be redirected.',
        });
        setTimeout(() => {
          router.push('/pages');
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
      dispatch({ type: 'LOGOUT' });
    }
  };
  return (
    <>
      <h1 className='pageHeading'>Signup</h1>
      <form id={form.id} method='post' onSubmit={handleSubmit}>
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
              setValue={(value) => handleInputChange(input.id, value)}
            />
          );
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Sign up</button>
      </form>
      <p>Sign up to create private pages that exist forever.</p>
    </>
  );
};

export const getServerSideProps = (context: NextPageContext) => {
  const { token } = cookies(context);
  const res = context.res;
  if (token) {
    res?.writeHead(302, { Location: `/account` });
    res?.end();
  }

  return { props: {} };
};

export default SinupPage;
