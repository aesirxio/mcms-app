/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ItemsViewModelContext = React.createContext();

export const ItemsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ItemsViewModelContext.Provider value={viewModel}>{children}</ItemsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useItemsViewModel = () => React.useContext(ItemsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withItemsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useItemsViewModel()} />;
};
