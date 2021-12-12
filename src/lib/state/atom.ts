import { atom } from 'recoil';

import { PlotType } from '../type/type';

export const userIdState = atom<string | null>({
  key: 'userId',
  default: null,
});

export const modelDataState = atom<PlotType[] | null>({
  key: 'modelData',
  default: null,
});

export const selectedPlotState = atom<PlotType | null>({
  key: 'selectedPlot',
  default: null,
});

export const isSideBarOpenState = atom<boolean>({
  key: 'isSideBarOpenState',
  default: false,
});
