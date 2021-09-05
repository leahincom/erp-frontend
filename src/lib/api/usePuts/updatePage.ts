import { instance } from '..';
import { BlockType } from '../../type';

const updatePage = async (blocks: BlockType[], id: string) => {
  try {
    const page = await instance.put(
      `/pages/${id}`,
      {
        blocks,
      },
      {
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] PUT page data');
    console.log(`[RESPONSE] ${page}`);

    return page;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updatePage;
