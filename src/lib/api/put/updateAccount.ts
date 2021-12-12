import { FormType } from '../../type/type';
import user from '../user';

const updateAccount = async (formData: FormType) => {
  try {
    const account = await user.put(`/users/account`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    return account.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updateAccount;
