import CategoriesDetailViewModel from './CategoriesDetailViewModel';

class CategoriesViewModel {
  categoriesDetailViewModel = null;

  constructor(categoriesStore) {
    if (categoriesStore) {
      this.categoriesDetailViewModel = new CategoriesDetailViewModel(categoriesStore);
    }
  }

  getCategoriesDetailViewModel = () => this.categoriesDetailViewModel;
}

export default CategoriesViewModel;
