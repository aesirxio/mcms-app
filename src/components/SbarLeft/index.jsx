import React from 'react';
import { withTranslation } from 'react-i18next';
// import i18n from 'translations/i18n';
import './index.scss';
import Menu from '../Menu';
// import { Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { observer } from 'mobx-react';
import ComponentImage from 'components/ComponentImage';
// import { AesirXDamStorage } from '@kakahuy113/test-dam-app';
const SbarLeft = observer(
  class SbarLeft extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
    }

    render() {
      let { t } = this.props;
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
          <div className="bottom-0 w-100 item_menu">
            <a
              href="/"
              className="d-block px-24 py-16 link_menu text-white text-decoration-none border-top border-dark-blue"
            >
              <ComponentImage src="/assets/images/help-icon.svg" />
              <span className="text ps-3">{t('txt_help_center')}</span>
            </a>
          </div>
        </aside>
      );
    }
  }
);

export default withTranslation('common')(SbarLeft);
