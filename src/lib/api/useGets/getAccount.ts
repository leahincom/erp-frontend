const getAccount = async (headers: Headers) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/account`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    console.log('[SUCCESS] GET account data');

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getAccount;
