// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import { FormType } from '../type';

const check = typeof window === 'undefined' ? false : !window.localStorage ? false : true;

export const login = async (formData: FormType) => {
  try {
    const userToken = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/users/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      },
    );
    console.log('[SUCCESS] LOGIN');
    console.log(`[RESPONSE] ${userToken}`);

    if (check) {
      localStorage.setItem('userToken', userToken.data.token);
    }

    return userToken;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export const logout = async () => {
  try {
    const userToken = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/logout`, {
      withCredentials: true,
    });

    console.log('[SUCCESS] LOGOUT');

    return userToken;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'x-auth-token': check && localStorage.getItem('userToken'),
  },
});
