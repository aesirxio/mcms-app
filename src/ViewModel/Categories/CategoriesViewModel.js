import CategoriesDetailViewModel from './CategoriesDetailViewModel';

class CategoriesViewModel {
  CategoriesDetailViewModel = null;

  constructor(categoriesStore) {
    if (categoriesStore) {
      this.CategoriesDetailViewModel = new CategoriesDetailViewModel(categoriesStore);
    }
  }

  getCategoriesDetailViewModel = () => this.CategoriesDetailViewModel;
}

export default CategoriesViewModel;
