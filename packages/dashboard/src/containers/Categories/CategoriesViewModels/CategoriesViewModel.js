import CategoriesDetailViewModel from './CategoriesDetailViewModel';
import CategoriesListViewModel from './CategoriesListViewModel';

class CategoriesViewModel {
  categoriesDetailViewModel = null;
  categoriesListViewModel = null;

  constructor(categoriesStore) {
    if (categoriesStore) {
      this.categoriesDetailViewModel = new CategoriesDetailViewModel(categoriesStore);
      this.categoriesListViewModel = new CategoriesListViewModel(categoriesStore);
    }
  }

  getCategoriesDetailViewModel = () => this.categoriesDetailViewModel;
  getCategoriesListViewModel = () => this.categoriesListViewModel;
}

export default CategoriesViewModel;
