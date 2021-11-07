import { instance } from '..';
import { FormType } from '../../type';

const createAccount = async (formData: FormType) => {
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

    console.log('[SUCCESS] POST account data', data);

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default createAccount;
