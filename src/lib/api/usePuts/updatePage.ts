import { instance } from '..';
import { BlockType } from '../../type';

const updatePage = async (blocks: BlockType[], id: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blocks,
      }),
    });

    console.log('[SUCCESS] PUT page data');

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updatePage;
