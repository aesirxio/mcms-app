import ItemsDetailViewModel from './ItemsDetailViewModel';
import ItemsListViewModel from './ItemsListViewModel';

class ItemsViewModel {
  itemsDetailViewModel = null;
  itemsListViewModel = null;

  constructor(itemsStore) {
    if (itemsStore) {
      this.itemsDetailViewModel = new ItemsDetailViewModel(itemsStore);
      this.itemsListViewModel = new ItemsListViewModel(itemsStore);
    }
  }

  getItemsDetailViewModel = () => this.itemsDetailViewModel;
  getItemsListViewModel = () => this.itemsListViewModel;
}

export default ItemsViewModel;
