import FieldsDetailViewModel from './FieldsDetailViewModel';
import FieldsListViewModel from './FieldsListViewModel';

class FieldsViewModel {
  fieldsDetailViewModel = null;
  fieldsListViewModel = null;

  constructor(fieldsStore) {
    if (fieldsStore) {
      this.fieldsDetailViewModel = new FieldsDetailViewModel(fieldsStore);
      this.fieldsListViewModel = new FieldsListViewModel(fieldsStore);
    }
  }

  getFieldsDetailViewModel = () => this.fieldsDetailViewModel;
  getFieldsListViewModel = () => this.fieldsListViewModel;
}

export default FieldsViewModel;
