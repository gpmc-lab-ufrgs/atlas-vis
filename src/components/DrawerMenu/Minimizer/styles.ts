import {Button} from 'antd';
import styled from 'styled-components';

// interface Minimizer {
//   isSidebarOpen: boolean;
//   theme: unknown;
// }

export const MinimizerButton = styled(Button)`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1000;
  background-color: #001529;
  color: white;
  border: none;
  &:hover {
    background-color: #1890ff;
  }
`;
