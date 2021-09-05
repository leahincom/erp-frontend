import { instance } from '..';

const deletePage = async (pageId: string) => {
  try {
    const page = await instance.delete(`/pages/${pageId}`, {
      withCredentials: true,
    });

    console.log('[SUCCESS] DELETE page data');
    console.log(`[RESPONSE] ${page}`);

    return page;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default deletePage;
