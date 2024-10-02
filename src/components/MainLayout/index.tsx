import {
    ApolloProvider,
  } from '@apollo/client';

import { Layout} from 'antd';
import { Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';

// import from local files
import { getApolloClient } from '../../utils/apollo';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';
import Map from '../Map';
import { useMapStore } from '../../store/useMapStore';
import { useEffect } from 'react';
import { logging } from '../../utils/loggin';



export const MainLayout = () => {
    
    const { user } = useAuthStore();
    const { setCenter } = useMapStore();
    const { location, followLocation, getUserLocation } = useUserStore();
    
    const {Header, Sider, Content} = Layout;

    getUserLocation(followLocation);
    useEffect(() => {
        logging.debug(`location: ${location.lat}, ${location.long}`);
        if (location.lat !== 0 && location.long !== 0) {
            setCenter([location.long, location.lat]);
        }
    }, [location]);

    return (
        <ApolloProvider client={getApolloClient(user.token)}>
            <Map>
                <Layout style={{height: '100vh', background: 'transparent'}}>
                    <Header style={{background: 'transparent'}}>
                        header
                    </Header>
                    <Layout style={{background: 'transparent'}}>
                        <Sider style={{background: 'transparent'}}>
                            Sider
                        </Sider>
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
                    <Footer style={{ textAlign: 'center', background: 'transparent' }}>
                        Footer content
                    </Footer>
                </Layout>
            </Map>
        </ApolloProvider>
    );
};