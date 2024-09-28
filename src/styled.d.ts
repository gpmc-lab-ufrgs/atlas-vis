import 'styled-components';

import {theme} from 'antd';
import Theme from './styles/Theme';

export type ITheme = typeof Theme;
const {token} = theme.useToken();
declare module 'styled-components' {
  export interface DefaultTheme {
    antd: typeof token;
    base: ITheme;
  }
}
