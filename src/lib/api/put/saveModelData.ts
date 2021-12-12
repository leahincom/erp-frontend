import { ModelType } from '../../type/type';
import user from '../user';

const saveModelData = async (plots: ModelType[]) => {
  try {
    const save = await user.put(`/users/account`, {
      plots,
    });
    console.log('[SUCCESS] POST model data');
    return save.data;
  } catch (err) {
    console.log('[FAIL] POST model data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default saveModelData;
