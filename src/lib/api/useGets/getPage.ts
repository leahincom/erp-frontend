import { instance } from '..';

const getPage = async (headers: Headers, id: string) => {
  try {
    const page = await instance.get(`/pages/${id}`, {
      headers: {
        ...headers,
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET pages data');
    console.log(`[RESPONSE] ${page}`);

    return page;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPage;
