// PageTitleContext.tsx
import React, { createContext, useContext, useState } from 'react';

const BaseLayoutContext = createContext({
  title: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTitle: (_title: string) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTitle = () => useContext(BaseLayoutContext);

export const BaseLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('Default Title 2');

  return (
	<BaseLayoutContext.Provider value={{ title, setTitle }}>
    {children}
	</BaseLayoutContext.Provider>
  );
};