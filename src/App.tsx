import {App as AntdApp, theme as AntdTheme} from 'antd';

import {Provider} from 'react-redux';

import {Outlet} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store';

import './App.css';
import {ThemeProvider} from 'styled-components';

import theme from './styles/Theme';
import { BaseLayoutProvider } from './components/BaseLayoutContext';


const App = () => {
  const {t, i18n} = useTranslation();
  const {token} = AntdTheme.useToken();

  return (
    <AntdApp>
      <Provider store={store}>
        <p>{t('loading')}</p>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={{antd: token, base: theme}}>
            <BaseLayoutProvider>
              <pre>
                {JSON.stringify(i18n.getDataByLanguage(i18n.language), null, '  ')}
              </pre>
              <div>
                <button className='border border-red-300 px-3 py-1 rounded-md' onClick={() => i18n.changeLanguage('en')}>en</button>
                <button className='border border-red-300 px-3 py-1 rounded-md' onClick={() => i18n.changeLanguage('pt-BR')}>pt-BR</button>
              </div>
              <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
              <Outlet />
            </BaseLayoutProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AntdApp>
  );
};

export default App;
