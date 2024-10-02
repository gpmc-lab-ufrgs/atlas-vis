import { Footer } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const FooterContainer = styled(Footer)`
  background-color: #032640;
`;

interface IInstitutionsLogo {
  size: number;
  src: string;
}

export const InstitutionsLogo = styled.div<IInstitutionsLogo>`
  height: ${({ size }) => size}px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  padding-right: 15px;
`;

export const FooterText = styled.h2`
  color: #ffff;
  font-weight: 400;
  font-size: 15px;
  padding-right: 10px;
`;
