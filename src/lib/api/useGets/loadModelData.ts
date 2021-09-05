import { baseURL, instance } from '..';

const loadModelData = async (id: string) => {
  try {
    const data = await fetch(`${baseURL}/inference/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());

    console.log('[SUCCESS] GET model data');

    return data;
  } catch (err) {
    console.log('[FAIL] GET model data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default loadModelData;
