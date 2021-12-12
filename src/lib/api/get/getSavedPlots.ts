import model from './../model';

const getSavedPlots = async (fileId: string) => {
  try {
    const savedPlots = await model.get(`/get_save_plots/${fileId}`);
    console.log('[SUCCESS] GET saved plots', savedPlots);
    return savedPlots.data;
  } catch (err) {
    console.log('[FAIL] GET saved plots', err);
    alert('저장된 플랏 로딩에 실패하였습니다.');
    return null;
  }
};

export default getSavedPlots;
