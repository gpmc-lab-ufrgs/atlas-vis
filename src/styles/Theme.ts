const colors = {
    main: '#00406F',
    primary: '#1890ff',
    secondary: '#f0f0f0',
    danger: '#ff4d4f',
    warning: '#faad14',
    success: '#52c41a',
    info: '#1890ff',
    light: '#f0f0f0',
    dark: '#000000',
    text: '#000000',
    background: '#f0f2f5',
    border: '#d9d9d9',
    disabled: '#d9d9d9',
    placeholder: '#d9d9d9',
    white: '#ffffff',
    black: '#000000',
  };

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
    colors,
  };
  
  export const colorBgContainerHeader = '#001529';
  
  // Definição do estilo global
  
  export default Theme;
  