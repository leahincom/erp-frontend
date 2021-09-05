import { instance } from '..';

const deleteImage = async (imageUrl: string) => {
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

export default deleteImage;
