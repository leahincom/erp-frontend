import { PlotType } from '../../type/type';
import model from '../model';

const savePlot = async (fileId: string, plot: PlotType) => {
  try {
    const save = await model.post(`/save`, {
      file_id: fileId,
      plot,
    });
    console.log('[SUCCESS] SAVE plot data', save);
    return save.data;
  } catch (err) {
    console.log('[FAIL] SAVE plot data', err);
    alert('플랏 저장에 실패하였습니다.');
    return null;
  }
};

export default savePlot;
