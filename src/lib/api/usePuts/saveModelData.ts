import { instance } from '..';
import { ModelType } from '../../type';

const saveModelData = async (plots: ModelType[]) => {
  try {
    const modelData = await instance.put(
      `/users/account`,
      {
        plots,
      },
      {
        headers: {
          'x-auth-token': localStorage.getItem('userToken'),
        },
        withCredentials: true,
      },
    );
    console.log('[SUCCESS] POST model data');
    console.log(`[RESPONSE] ${modelData}`);

    return modelData;
  } catch (err) {
    console.log('[FAIL] POST model data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default saveModelData;
