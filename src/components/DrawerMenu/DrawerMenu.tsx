import React from 'react';

import * as Styles from './styles';

type Anchor = 'right' | 'left';
interface Props {
  open: boolean;
  placement: Anchor;
  children: React.ReactNode;
  closeClick?: () => void;
  openClick?: () => void;
  hideBackdrop?: boolean;
}

const DrawerMenu: React.FC<Props> = ({
  open,
  placement,
  children,
  closeClick,
  openClick,
}) => {
  return (
    <>
      <Styles.StyledDrawer
        placement={placement}
        open={open}
        style={{backgroundColor: 'rgba(0, 64, 111, 0.9)'}}
        styles={{header: {display: 'none'}, body: {padding: 30}}}
        onClose={closeClick}
        classNames={{
          wrapper: '!max-w-[calc(100vw_-_50px)]',
        }}
      >
        {children}
      </Styles.StyledDrawer>
    </>
  );
};

export default DrawerMenu;
