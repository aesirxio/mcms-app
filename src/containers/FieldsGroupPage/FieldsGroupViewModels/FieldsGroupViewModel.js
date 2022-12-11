import FieldsGroupDetailViewModel from './FieldsGroupDetailViewModel';
import FieldsGroupListViewModel from './FieldsGroupListViewModel';

class FieldsGroupViewModel {
  fieldsGroupDetailViewModel = null;
  fieldsGroupListViewModel = null;

  constructor(fieldsGroupStore) {
    if (fieldsGroupStore) {
      this.fieldsGroupDetailViewModel = new FieldsGroupDetailViewModel(fieldsGroupStore);
      this.fieldsGroupListViewModel = new FieldsGroupListViewModel(fieldsGroupStore);
    }
  }

  getFieldsGroupDetailViewModel = () => this.fieldsGroupDetailViewModel;
  getFieldsGroupListViewModel = () => this.fieldsGroupListViewModel;
}

export default FieldsGroupViewModel;
