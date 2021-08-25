import { createGlobalStyle } from 'styled-components';

import initializeStyle from './initializeStyle';

const globalStyle = createGlobalStyle`
  ${initializeStyle}
`;

export default globalStyle;
