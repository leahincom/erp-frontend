import { instance } from '..';

export const deletePage = async (pageId: string) => {
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

export const deleteImage = async (imageUrl: string) => {
  try {
    const image = await instance.delete(`/pages/${imageUrl}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] DELETE image data');
    console.log(`[RESPONSE] ${image}`);

    return image;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};
