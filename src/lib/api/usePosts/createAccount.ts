import { instance } from '..';
import { FormType } from '../../type';

const createAccount = async (formData: FormType) => {
  try {
    const account = await instance.post(
      `/users/signup`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('userToken'),
        },
        withCredentials: true,
      },
    );
    console.log('[SUCCESS] POST account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default createAccount;
