import model from './../model';

const uploadData = async (formData: FormData) => {
  try {
    const data = await model.post(`/upload`, formData);
    console.log('[SUCCESS] UPLOAD data', data);
    return data.data;
  } catch (err) {
    console.log('[FAIL] UPLOAD data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default uploadData;
