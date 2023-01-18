import ContentDetailViewModel from './ContentDetailViewModel';
import ContentListViewModel from './ContentListViewModel';

class ContentViewModel {
  contentDetailViewModel = null;
  contentListViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      this.contentDetailViewModel = new ContentDetailViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);
    }
  }

  getContentDetailViewModel = () => this.contentDetailViewModel;
  getContentListViewModel = () => this.contentListViewModel;
}

export default ContentViewModel;
