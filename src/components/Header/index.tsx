import {HiMenuAlt2, HiMenuAlt3} from 'react-icons/hi';
import {useMapStore} from '../../store/useMapStore';
import LanguageSelector from '../LanguageSelector';
import centeredImageLogo from './../../assets/utils/centeredImageLogo.png';

const Header = () => {
  const {openDrawer, openDrawerLLM} = useMapStore();
  //   const {location, followLocation, getUserLocation} = useUserStore();
  return (
    <div className="fixed top-0 left-0 backdrop-blur-md bg-black/5 w-full flex flex-row justify-between px-5 py-4 gap-3 items-center">
      <button
        className="transition-all text-cyan-700 text-2xl hover:bg-cyan-700 hover:text-white p-2 rounded-lg"
        onClick={openDrawer}
      >
        <HiMenuAlt2 />
      </button>
      <img src={centeredImageLogo} alt="Atlas logo" className="max-h-[40px]" />
      <div className="flex-1"></div>
      <LanguageSelector />
      <button
        className="transition-all text-cyan-700 text-2xl hover:bg-cyan-700 hover:text-white p-2 rounded-lg"
        onClick={openDrawerLLM}
      >
        <HiMenuAlt3 />
      </button>
    </div>
  );
};

export default Header;
