import { instance } from '..';

const postSampleData = async (formData: FormData) => {
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

export default postSampleData;
