import { developerInstitutionsLogoImages, supporterInstitutionLogoImages } from './utils/institutions';

import * as Styles from './styles';
import { Card, Col, Row } from 'antd';

// const isEnglish = window.location.href.includes('/en');

function Footer() {
  return (
    <Styles.FooterContainer>
      <Row justify='center' align='middle'>
        <Col span={10} xs={20} lg={10}>
          <Row justify='center' align='middle'>
            <Col lg={4} xs={10} key={0}>
              <Styles.FooterText>&nbsp;&nbsp;<b>Supported by:</b></Styles.FooterText>
            </Col>
            {developerInstitutionsLogoImages.map((institution, id) => (
              <Col lg={2} xs={10} key={id} >
                <Styles.InstitutionsLogo
                  key={id}
                  src={institution.logoImage}
                  title={`Logo image of ${institution.name}`}
                  size={institution.size}
                  aria-label="institution-logo"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={10}>
          <Row justify='center' align='middle'>
            <Col lg={4} xs={10} key={0}>
              <Styles.FooterText>&nbsp;&nbsp;<b>Support:</b></Styles.FooterText>
            </Col>
            {supporterInstitutionLogoImages.map((institution, id) => (
              <Col lg={4} xs={10} key={id} >
                <Styles.InstitutionsLogo
                  src={institution.logoImage}
                  title={`Logo image of ${institution.name}`}
                  size={institution.size}
                  aria-label="institution-logo"
                />
              </Col>              
            ))}
          </Row>
        </Col>
      </Row>
    </Styles.FooterContainer>
  );
}

export default Footer;
