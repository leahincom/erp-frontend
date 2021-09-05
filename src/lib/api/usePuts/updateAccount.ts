import { instance } from '..';
import { FormType } from '../../type';

const updateAccount = async (formData: FormType) => {
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

    console.log('[SUCCESS] PUT account data');

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updateAccount;
