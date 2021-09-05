import { instance } from '..';
import { BlockType } from '../../type';

const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    const pages = await instance.post(
      `/pages`,
      {
        blocks,
      },
      {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('userToken'),
        },
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] POST pages data');
    console.log(`[RESPONSE] ${pages}`);

    return pages;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default postPages;
