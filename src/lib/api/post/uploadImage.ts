import user from '../user';

const uploadImage = async (pageId: string, formData: FormData) => {
  try {
    const image = await user.post(`/pages/images?pageId=${pageId}`, formData);
    return image.data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default uploadImage;
