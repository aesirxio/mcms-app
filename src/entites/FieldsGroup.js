import { ITEMS_FIELD_KEY } from 'constants/ItemsFieldKey';

export default class FieldsGroupEntity {
  id = 0;
  name = '';
  values = [];

  constructor(entity) {
    if (entity) {
      this.id = entity[ITEMS_FIELD_KEY.ID] ?? 0;
      this.name = entity[ITEMS_FIELD_KEY.NAME] ?? '';
      this.values = entity[ITEMS_FIELD_KEY.VALUES] ?? '';
    }
  }

  static convertSubmittedDataToAPIService(data) {
    const result = data
      ? {
          [ITEMS_FIELD_KEY.ID]: data[ITEMS_FIELD_KEY.ID] ?? null,
          [ITEMS_FIELD_KEY.NAME]: data[ITEMS_FIELD_KEY.NAME] ?? '',
        }
      : null;
    return result;
  }
}
