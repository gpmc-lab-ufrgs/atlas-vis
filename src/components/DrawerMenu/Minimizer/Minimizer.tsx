import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as Styles from './styles';

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Minimizer = ({ isOpen, toggleDrawer }: Props) => {
  
  const handleClick = () => {
    toggleDrawer();
  };

  return (
    <Styles.MinimizerButton onClick={handleClick}>
      {isOpen ? <LeftOutlined /> : <RightOutlined />}
    </Styles.MinimizerButton>
  );
};

export default Minimizer;
