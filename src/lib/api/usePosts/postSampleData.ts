import { instance, baseURL } from '..';

const postSampleData = async (formData: FormData) => {
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
  } catch (err) {
    console.log('[FAIL] POST sample data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default postSampleData;
