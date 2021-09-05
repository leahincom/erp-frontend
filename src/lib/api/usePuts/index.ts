import { instance } from '..';
import { BlockType, FormType, ModelType } from '../../type';

export const saveModelData = async (plots: ModelType[]) => {
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

export const updatePage = async (blocks: BlockType[], id: string) => {
  try {
    const page = await instance.put(
      `/pages/${id}`,
      {
        blocks,
      },
      {
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] PUT page data');
    console.log(`[RESPONSE] ${page}`);

    return page;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export const updateAccount = async (formData: FormType) => {
  try {
    const account = await instance.put(
      `/users/account`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      },
    );

    console.log('[SUCCESS] PUT account data');
    console.log(`[RESPONSE] ${account}`);

    return account;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};
