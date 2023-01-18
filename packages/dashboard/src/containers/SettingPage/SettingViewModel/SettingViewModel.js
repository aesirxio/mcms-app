import SettingListViewModel from "./SettingListViewModel";
class HomeViewModel {
  settingListViewModel = null;
  constructor(settingStore) {
    if (settingStore) {
      this.settingListViewModel = new SettingListViewModel(settingStore);
    }
  }

  getSettingListViewModel = () => this.settingListViewModel;
}

export default HomeViewModel;
