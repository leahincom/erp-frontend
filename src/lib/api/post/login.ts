import { FormType } from '../../type/type';

import user from './../user';

const login = async (formData: FormType) => {
  try {
    const data = await user.post(`/users/login`, {
      email: formData.email,
      password: formData.password,
    });
    return data.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default login;
