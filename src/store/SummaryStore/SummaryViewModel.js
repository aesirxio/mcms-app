import SummaryListViewModel from "./SummaryListViewModel";
import SummaryFromViewModel from "./SummaryFormViewModel";
class SummaryViewModel {
  summaryListViewModel = null;
  summaryFormViewModel = null;
  constructor(summaryStore) {
    if (summaryStore) {
      this.summaryListViewModel = new SummaryListViewModel(summaryStore);
      this.summaryFormViewModel = new SummaryFromViewModel(summaryStore);
    }
  }

  getSummaryListViewModel = () => this.summaryListViewModel;
  getSummaryFormViewModel = () => this.summaryFormViewModel;
}

export default SummaryViewModel;
