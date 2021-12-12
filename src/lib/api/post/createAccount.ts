import { FormType } from '../../type/type';
import user from '../user';

const createAccount = async (formData: FormType) => {
  try {
    const account = await user.post(`/users/signup`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    return account.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default createAccount;
