import user from '../user';

const getPage = async (headers: Headers, id: string | string[] | undefined) => {
  try {
    const page = await user.get(`/pages/${id}`, {
      headers,
    });
    return page.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPage;
