import ItemsDetailViewModel from './ItemsDetailViewModel';
// import ItemsListViewModel from './ItemsListViewModel';

class ItemsViewModel {
  itemsDetailViewModel = null;
  // itemsListViewModel = null;

  constructor(itemsStore) {
    if (itemsStore) {
      this.itemsDetailViewModel = new ItemsDetailViewModel(itemsStore);
      // this.itemsListViewModel = new ItemsListViewModel(itemsStore);
    }
  }

  // getItemsListViewModel = () => this.itemsListViewModel;
  getItemsDetailViewModel = () => this.itemsDetailViewModel;
}

export default ItemsViewModel;
