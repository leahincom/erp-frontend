const getPage = async (headers: Headers, id: string | string[] | undefined) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    console.log('[SUCCESS] GET page data', data);

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPage;
