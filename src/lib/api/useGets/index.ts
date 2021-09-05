import { instance } from '..';

export const loadModelData = async (id: string) => {
  try {
    const modelData = await instance.get(`/inference/${id}`, {
      withCredentials: true,
    });

    console.log('[SUCCESS] GET model data');
    console.log(`[RESPONSE] ${modelData}`);

    return modelData;
  } catch (err) {
    console.log('[FAIL] GET model data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export const getPage = async (headers: Headers, id: string) => {
  try {
    const page = await instance.get(`/pages/${id}`, {
      headers: {
        ...headers,
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET pages data');
    console.log(`[RESPONSE] ${page}`);

    return page;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export const getPages = async (headers: Headers) => {
  try {
    const pages = await instance.get(`/pages`, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET pages data');
    console.log(`[RESPONSE] ${pages}`);

    return pages;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export const getAccount = async (headers: Headers) => {
  try {
    const account = await instance.get(`/users/account`, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('userToken'),
      },
      withCredentials: true,
    });

    console.log('[SUCCESS] GET account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};
