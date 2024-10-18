import {Select} from 'antd';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSelector = () => {
  const {t, i18n} = useTranslation();

  const languages = useMemo(
    () => [
      {value: 'en', label: t('languages.english')},
      {value: 'pt-BR', label: t('languages.portuguese')},
    ],
    [t]
  );

  return (
    <Select
      options={languages}
      value={i18n.language}
      onChange={language => i18n.changeLanguage(language)}
    />
  );
};

export default LanguageSelector;
