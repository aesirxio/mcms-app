/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ItemsViewModel from './ItemsViewModel';

class ItemsListViewModel {
  itemViewModel = null;

  constructor(itemsStore) {
    if (itemsStore) {
      this.itemViewModel = new ItemsViewModel(itemsStore);
    }
  }

  getProductDetailViewModel = () => this.itemViewModel;
}

export default ItemsListViewModel;
