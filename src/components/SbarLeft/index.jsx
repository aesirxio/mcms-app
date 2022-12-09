import React from 'react';
import { withTranslation } from 'react-i18next';
// import i18n from 'translations/i18n';
import './index.scss';
import Menu from '../Menu';
// import { Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import { observer } from 'mobx-react';
import ComponentImage from 'components/ComponentImage';
// import { AesirXDamStorage } from '@kakahuy113/aesirx-dam-app';
const SbarLeft = observer(
  class SbarLeft extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.biListViewModel = this.viewModel ? this.viewModel.biListViewModel : null;
    }

    render() {
      let { t } = this.props;

      // const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      //   return { language: key, title: i18n.options.resources[key].title };
      // });
      // let currentLanguage = listLanguages.filter((lang) => {
      //   if (lang.language == i18n.language) {
      //     return lang.title;
      //   }
      // });
      return (
        <aside
          className={`sidebar w-248  mt-0 position-relative bg-dark mh-100 h-100 overflow-hidden overflow-y-auto d-flex flex-column z-index-100 justify-content-between`}
        >
          <>
            <Menu />
          </>
          {/* <div>
            <AesirXDamStorage />
          </div> */}
          <div className="d-flex align-items-center justify-content-between bottom-0 w-100  button-language item_menu">
            <a href="/" className="d-flex align-items-center py-2 px-3">
              <ComponentImage src="/assets/images/help-icon.svg" />
              <span className="text-white ps-3">{t('txt_help_center')}</span>
            </a>
          </div>

          <div></div>
        </aside>
      );
    }
  }
);

export default withTranslation('common')(withBiViewModel(SbarLeft));
