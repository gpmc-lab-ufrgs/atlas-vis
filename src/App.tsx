import {App as AntdApp, theme as AntdTheme} from 'antd';

import {Provider} from 'react-redux';

import {Outlet} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store';

import {ThemeProvider} from 'styled-components';

import theme from './styles/Theme';
import { BaseLayoutProvider } from './components/BaseLayoutContext';


const App = () => {
  const {t} = useTranslation();
  const {token} = AntdTheme.useToken();

  return (
    <AntdApp>
      <Provider store={store}>
        <p>{t('loading')}</p>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={{antd: token, base: theme}}>
            <BaseLayoutProvider>
              <Outlet />
            </BaseLayoutProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AntdApp>
  );
};

export default App;
