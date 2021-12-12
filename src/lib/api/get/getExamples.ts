import model from './../model';

const getExamples = async () => {
  try {
    const examples = await model.get(`/inference_example`);
    return examples.data;
  } catch (err) {
    console.log('[FAIL] GET examples', err);
    alert('모델 로딩에 실패하였습니다.');
    return null;
  }
};

export default getExamples;
