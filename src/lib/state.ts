import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const loginState = atom({
  key: 'login',
  default: false,
});

export const loadDataState = atom({
  key: 'loadData',
  default: [],
});

export const modelDataState = atom({
  key: 'modelData',
  default: [],
});

export const modelImagesState = atom({
  key: 'modelImages',
  default: [],
});

export const selectedGraphState = atom({
  key: 'selectedGraph',
  default: -1,
});
