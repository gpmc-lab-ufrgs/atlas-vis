import {
    ApolloProvider,
  } from '@apollo/client';

import { Drawer, Layout} from 'antd';
import { Outlet } from 'react-router-dom';

// import from local files
import { getApolloClient } from '../../utils/apollo';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import Map from '../Map';
import { useMapStore } from '../../store/useMapStore';
import { useEffect } from 'react';
import { logging } from '../../utils/loggin';
import Footer from '../Footer';
import DrawerMenu from '../DrawerMenu/DrawerMenu';



export const MainLayout = () => {
    
    const { user } = useAuthStore();
    const { drawerVisible, drawerLLMVisible, closeDrawer, closeDrawerLLM, openDrawer, openDrawerLLM, setCenter } = useMapStore();
    const { location, followLocation, getUserLocation } = useUserStore();
    
    const {Header, Content} = Layout;

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
                        <Header style={{background: 'transparent'}}>
                            header
                        </Header>
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
                    <Footer />
                </Layout>
        </ApolloProvider>
    );
};