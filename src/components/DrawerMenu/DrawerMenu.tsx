import React from 'react';

import * as Styles from './styles';

import centeredImageLogo from '../../assets/utils/centeredImageLogo.png';
import { Col, Row } from 'antd';
import Minimizer from './Minimizer';


type Anchor = 'right' | 'left';
interface Props {
    open: boolean;
    placement: Anchor;
    children: React.ReactNode;
    closeClick?: () => void;
    openClick?: () => void;
    hideBackdrop?: boolean;
}

const DrawerMenu: React.FC<Props> = ({ open, placement, children, closeClick, openClick }) => {

    return (
        <>
            <Styles.StyledDrawer
                placement={placement}
                open={open}
                style={{backgroundColor: 'rgba(0, 64, 111, 0.9)'}}
                styles={{ header: { display: 'none' }, body: { padding: 30 } }}
            >
                <Row align="middle" justify="center">
                    <Col span={24}>
                        <img src={centeredImageLogo} alt="Centered Image" style={{ width: '100%'}} />
                    </Col>
                </Row>
                {children}
            </Styles.StyledDrawer>
            <Minimizer
                isOpen={open}
                toggleDrawer={() => {
                    if (open && closeClick) {
                        closeClick();
                    } else if (openClick) {
                        openClick();
                    }
                }}
            />
        </>
    );

};

export default DrawerMenu;