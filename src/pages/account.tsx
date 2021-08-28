import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useState } from 'react';

import Input from '../components/Input';
import Notice from '../components/Notice';

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
      required: false,
      value: '',
    },
  ],
};

export type UserType = {
  name: string;
  email: string;
  password: string;
};

const AccountPage = (user: UserType) => {
  const RESET_NOTICE = { type: '', message: '' };
  const [notice, setNotice] = useState(RESET_NOTICE);

  const values = {
    [form.inputs[0].id]: user ? user.name : form.inputs[0].value,
    [form.inputs[1].id]: user ? user.email : form.inputs[1].value,
    [form.inputs[2].id]: form.inputs[2].value,
  };

  const [formData, setFormData] = useState(values);

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);

    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/account`, {
        method: 'PUT',
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
        setNotice({ type: 'SUCCESS', message: 'Successfully updated.' });
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
    }
  };

  return (
    <>
      <h1 className='pageHeading'>Account</h1>
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
              setValue={(value: string) => handleInputChange(input.id, value)}
            />
          );
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Update Account</button>
      </form>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = cookies(context);
  const res = context.res;
  const req = context.req;

  if (!token) {
    res?.writeHead(302, { Location: `/login` });
    res?.end();
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/account`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    return {
      props: { user: { name: data.name, email: data.email } },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default AccountPage;
