import { instance } from '..';
import { BlockType, FormType } from '../../type';

export const postSampleData = async (formData: FormData) => {
  try {
    const sampleData = await instance.post(
      `/upload`,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('userToken'),
        },
      },
    );
    console.log('[SUCCESS] POST sample data');
    console.log(`[RESPONSE] ${sampleData}`);
    return sampleData;
  } catch (err) {
    console.log('[FAIL] POST sample data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    const pages = await instance.post(
      `/pages`,
      {
        blocks,
      },
      {
        headers: {
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

export const uploadImage = async (pageId: string, formData: FormData) => {
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

export const createAccount = async (formData: FormType) => {
  try {
    const account = await instance.post(
      `/users/signup`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('userToken'),
        },
        withCredentials: true,
      },
    );
    console.log('[SUCCESS] POST account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};
