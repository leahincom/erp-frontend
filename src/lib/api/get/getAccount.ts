import user from '../user';

const getAccount = async (headers: Headers) => {
  try {
    const account = await user.get(`/users/account`, {
      headers,
    });
    return account.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getAccount;
