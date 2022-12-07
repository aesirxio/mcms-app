import React from 'react';

const CategoriesViewModelContext = React.createContext();

export const CategoriesViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <CategoriesViewModelContext.Provider value={viewModel}>
      {children}
    </CategoriesViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCategoriesViewModel = () => React.useContext(CategoriesViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCategoriesViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useCategoriesViewModel()} />;
};
