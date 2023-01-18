import React from 'react';

const FieldsViewModelContext = React.createContext();

export const FieldsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <FieldsViewModelContext.Provider value={viewModel}>{children}</FieldsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFieldsViewModel = () => React.useContext(FieldsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFieldsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useFieldsViewModel()} />;
};
