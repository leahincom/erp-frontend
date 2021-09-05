import { instance } from '..';

const getPages = async (headers: Headers) => {
  try {
    const pages = await instance.get(`/pages`, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET pages data');
    console.log(`[RESPONSE] ${pages}`);

    return pages;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPages;
