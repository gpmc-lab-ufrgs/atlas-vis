const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  };
  
  const fontSizes = {
    small: '14px',
    medium: '16px',
    large: '24px',
  };
  
  const breakpoints = {
    base: '@media(min-width: 0px)',
    xs: '@media(min-width: 480px)',
    sm: '@media(min-witdth: 576px)',
    md: '@media(min-width: 768px)',
    lg: '@media(min-width: 992px)',
    xl: '@media(min-width: 1200px)',
    xxl: '@media(min-width: 1600px)',
  };
  
  // Definição do tema
  const Theme = {
    spacing,
    fontSizes,
    breakpoints,
  };
  
  export const colorBgContainerHeader = '#001529';
  
  // Definição do estilo global
  
  export default Theme;
  