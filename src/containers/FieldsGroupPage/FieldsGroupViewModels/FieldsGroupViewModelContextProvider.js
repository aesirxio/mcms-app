import React from 'react';

const FieldsGroupViewModelContext = React.createContext();

export const FieldsGroupViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <FieldsGroupViewModelContext.Provider value={viewModel}>
      {children}
    </FieldsGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useFieldsGroupViewModel = () => React.useContext(FieldsGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withFieldsGroupViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useFieldsGroupViewModel()} />;
};
