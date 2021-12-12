import user, { BASEURL } from '../user';

const logout = async () => {
  try {
    const logout = await user.post(`${BASEURL}/users/logout`);
    return logout.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default logout;
