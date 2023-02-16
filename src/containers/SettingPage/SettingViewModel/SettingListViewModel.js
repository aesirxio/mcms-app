import { makeAutoObservable } from 'mobx';

class SettingListViewModel {
  settingStore = null;

  constructor(settingStore) {
    makeAutoObservable(this);
    this.settingStore = settingStore;
  }
}

export default SettingListViewModel;
