import VisitorListViewModel from "./VisitorListViewModel";
import VisitorFromViewModel from "./VisitorFormViewModel";
class VisitorViewModel {
  visitorListViewModel = null;
  visitorFormViewModel = null;
  constructor(visitorStore) {
    if (visitorStore) {
      this.visitorListViewModel = new VisitorListViewModel(visitorStore);
      this.visitorFormViewModel = new VisitorFromViewModel(visitorStore);
    }
  }

  getVisitorListViewModel = () => this.visitorListViewModel;
  getVisitorFormViewModel = () => this.visitorFormViewModel;
}

export default VisitorViewModel;
