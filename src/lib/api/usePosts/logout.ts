const logout = async () => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('LOGOUT', data);

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default logout;
