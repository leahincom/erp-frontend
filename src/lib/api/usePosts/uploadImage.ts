import { instance } from '..';

const uploadImage = async (pageId: string, formData: FormData) => {
  try {
    const image = await instance.post(
      `/pages/images?pageId=${pageId}`,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('userToken'),
        },
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] POST image data');
    console.log(`[RESPONSE] ${image}`);

    return image;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default uploadImage;
