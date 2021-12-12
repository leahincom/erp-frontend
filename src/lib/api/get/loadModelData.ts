import model from './../model';

const loadModelData = async (id: string) => {
  try {
    const modelData = await model.get(`/inference/${id}`);
    console.log('[SUCCESS] LOAD model data', modelData);
    return modelData.data;
  } catch (err) {
    console.log('[FAIL] LOAD model data', err);
    alert('모델 로딩에 실패하였습니다.');
    return null;
  }
};

export default loadModelData;
