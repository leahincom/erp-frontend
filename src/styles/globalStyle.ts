import { createGlobalStyle } from 'styled-components';

import initializeStyle from './initializeStyle';
import styleVariables from './styleVariables';

const globalStyle = createGlobalStyle`
  ${initializeStyle}
  ${styleVariables}
`;

export default globalStyle;
