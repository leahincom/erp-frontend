import { BlockType } from '../../type/type';
import user from '../user';

const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    const pages = await user.post(
      `/pages`,
      {
        blocks,
      },
      {
        headers,
      },
    );
    return pages.data;
  } catch (err) {
    console.log('[FAIL] POST pages data', err);
  }
};

export default postPages;
