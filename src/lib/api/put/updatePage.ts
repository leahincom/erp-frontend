import { BlockType } from '../../type/type';
import user from '../user';

const updatePage = async (blocks: BlockType[], id: string) => {
  try {
    const data = await user.put(`/pages/${id}`, { blocks });
    return data.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updatePage;
