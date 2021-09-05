import { instance } from '..';
import { FormType } from '../../type';

const updateAccount = async (formData: FormType) => {
  try {
    const account = await instance.put(
      `/users/account`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] PUT account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updateAccount;
