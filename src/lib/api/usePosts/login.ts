import { FormType } from '../../type';

const login = async (formData: FormType) => {
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

    console.log('[SUCCESS] LOGIN', data);
    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default login;