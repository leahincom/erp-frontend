import { BlockType, FormType, ModelType } from '../types';

const baseURL = 'http://203.255.176.80:5018/';

// --- load model ---

export const postSampleData = async (formData: FormData) => {
  try {
    const data = await fetch(`${baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((res) => res.json());
    console.log('[SUCCESS] POST sample data');
    return data;
  } catch (e) {
    console.log('[FAIL] POST sample data', e);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export const loadModelData = async (id: string) => {
  try {
    const data = await fetch(`${baseURL}/inference/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
    console.log('[SUCCESS] GET model data');
    return data;
  } catch (e) {
    console.log('[FAIL] GET model data', e);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

// save model list to user's
export const saveModelData = async (plots: ModelType[]) => {
  try {
    const data = await fetch(`${baseURL}/users/account`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plots,
      }),
    }).then((res) => res.json());
    console.log('[SUCCESS] POST model data');
    return data;
  } catch (e) {
    console.log('[FAIL] POST model data', e);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

// --- dashboard ---

export const getPages = async (headers: Headers) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());
    console.log('[SUCCESS] GET pages data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        blocks,
      }),
    }).then((res) => res.json());
    console.log('[SUCCESS] POST pages data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const getPage = async (headers: Headers, id: string | string[] | undefined) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());
    console.log('[SUCCESS] GET page data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const updatePage = async (blocks: BlockType[], id: string) => {
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
    console.log('[FAIL]');
    console.log(err);
  }
};

export const deletePage = async (pageId: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('[SUCCESS] DELETE page data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${imageUrl}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log('[SUCCESS] DELETE image data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const uploadImage = async (pageId: string, formData: FormData) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/images?pageId=${pageId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((res) => res.json());
    console.log('[SUCCESS] POST image data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

// --- user account ---

export const createAccount = async (formData: FormType) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    }).then((res) => res.json());
    console.log('[SUCCESS] POST account data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const updateAccount = async (formData: FormType) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/account`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    }).then((res) => res.json());
    console.log('[SUCCESS] PUT account data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const getAccount = async (headers: Headers) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/account`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());
    console.log('[SUCCESS] GET account data');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const login = async (formData: FormType) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }).then((res) => res.json());
    console.log('[SUCCESS] LOGIN');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('LOGOUT');
    return data;
  } catch (err) {
    console.log('[FAIL]');
    console.log(err);
  }
};
