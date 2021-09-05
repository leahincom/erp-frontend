import { instance } from '..';

const getAccount = async (headers: Headers) => {
  try {
    const account = await instance.get(`/users/account`, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getAccount;
