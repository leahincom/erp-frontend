import { instance } from '..';

const loadModelData = async (id: string) => {
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

export default loadModelData;
