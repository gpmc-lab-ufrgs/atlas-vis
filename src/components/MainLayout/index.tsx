import {ApolloProvider} from '@apollo/client';

import {Layout} from 'antd';
import {Outlet} from 'react-router-dom';

import {useEffect} from 'react';
import {useAuthStore} from '../../store/useAuthStore';
import {useMapStore} from '../../store/useMapStore';
import {useUserStore} from '../../store/useUserStore';
import {getApolloClient} from '../../utils/apollo';
import {logging} from '../../utils/loggin';
import DrawerMenu from '../DrawerMenu/DrawerMenu';
import Footer from '../Footer';
import Map from '../Map';
import Header from './../Header';

export const MainLayout = () => {
  const {user} = useAuthStore();
  const {
    drawerVisible,
    drawerLLMVisible,
    closeDrawer,
    closeDrawerLLM,
    openDrawer,
    openDrawerLLM,
    setCenter,
  } = useMapStore();
  const {location, followLocation, getUserLocation} = useUserStore();

  const {Content} = Layout;

  getUserLocation(followLocation);
  useEffect(() => {
    logging.debug(`location: ${location.lat}, ${location.long}`);
    if (location.lat !== 0 && location.long !== 0) {
      setCenter([location.long, location.lat]);
    }
  }, [location]);

  return (
    <ApolloProvider client={getApolloClient(user.token)}>
      <Layout style={{height: '100vh', background: 'transparent'}}>
        <DrawerMenu
          open={drawerVisible}
          placement="left"
          closeClick={closeDrawer}
          openClick={openDrawer}
        >
          [Sider content]
        </DrawerMenu>
        <DrawerMenu
          open={drawerLLMVisible}
          placement="right"
          closeClick={closeDrawerLLM}
          openClick={openDrawerLLM}
        >
          [LLM Sider content]
        </DrawerMenu>
        <Map>
          <Layout style={{background: 'transparent'}}>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: 'transparent',
                overflowY: 'scroll',
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Map>
        <Header />
        <Footer />
      </Layout>
    </ApolloProvider>
  );
};
