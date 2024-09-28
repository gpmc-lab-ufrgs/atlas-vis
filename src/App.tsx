import {App as AntdApp, theme as AntdTheme} from 'antd';

import {Provider} from 'react-redux';

// import {Outlet} from 'react-router-dom';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store';

import {ThemeProvider} from 'styled-components';

import theme from './styles/Theme';
// import { PageTitleProvider } from './components/PageTitleContext';


const App = () => {
  const {token} = AntdTheme.useToken();

  return (
    <AntdApp>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={{antd: token, base: theme}}>
            {/* <PageTitleProvider>
              <Outlet />
            </PageTitleProvider> */}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AntdApp>
  );
};

export default App;
