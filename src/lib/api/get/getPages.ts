import user from '../user';

const getPages = async (headers: Headers) => {
  try {
    const pages = await user.get(`/pages`, {
      headers,
    });
    return pages.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPages;
