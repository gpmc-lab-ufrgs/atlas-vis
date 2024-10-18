import {
  developerInstitutionsLogoImages,
  Institution,
  supporterInstitutionLogoImages,
} from './utils/institutions';

import {useTranslation} from 'react-i18next';

// const isEnglish = window.location.href.includes('/en');

const FooterItem = ({
  title,
  institutions,
}: {
  title: string;
  institutions: Institution[];
}) => {
  return (
    <div className="flex flex-col gap-2 items-stretch flex-1">
      <p className="text-white">{title}</p>
      <div className="flex flex-row gap-3 flex-1">
        {institutions.map((institution, id) => (
          <div
            key={id}
            className="flex-1 flex flex-col max-w-24 justify-center"
          >
            <img
              src={institution.logoImage}
              alt={`Logo image of ${institution.name}`}
              title={`Logo image of ${institution.name}`}
              //   style={{width: `${institution.size}px`}}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const {t} = useTranslation();
  return (
    <div className="bg-[#032640] flex flex-row justify-center py-4 lg:py-7">
      <div className="flex max-w-6xl px-5 flex-col md:flex-row gap-5 w-full items-stretch">
        <FooterItem
          title={t('footer.supportedBy')}
          institutions={developerInstitutionsLogoImages}
        />
        {/* {developerInstitutionsLogoImages.map((institution, id) => (
            <Col lg={2} xs={10} key={id}>
              <Styles.InstitutionsLogo
                key={id}
                src={institution.logoImage}
                title={`Logo image of ${institution.name}`}
                size={institution.size}
                aria-label="institution-logo"
              />
            </Col>
          ))}
        </FooterItem> */}
        <FooterItem
          title={t('footer.support')}
          institutions={supporterInstitutionLogoImages}
        />
        {/* {supporterInstitutionLogoImages.map((institution, id) => (
            <Col lg={4} xs={10} key={id}>
              <Styles.InstitutionsLogo
                src={institution.logoImage}
                title={`Logo image of ${institution.name}`}
                size={institution.size}
                aria-label="institution-logo"
              />
            </Col>
          ))}
        </FooterItem> */}
      </div>
    </div>
  );
};

export default Footer;
