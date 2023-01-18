import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
// import BannerLeft from '../../components/BannerLeft';
import './index.scss';

import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';
// import ComponentImage from 'components/ComponentImage';
import Checkbox from 'components/Checkbox';
import { SSOButton } from 'aesirx-sso';
import { Storage, AesirxAuthenticationApiService } from 'aesirx-dma-lib';

// import ComponentImage from 'components/ComponentImage';
// const dataSlider = [
//   {
//     text: "I created DMA to help transform any marketing team! It's easy to use, saves on time, resources and money, and can be fully customized to fit any business's needs.",
//     title: 'Ronni K. Gothard Christiansen',
//     subtitle: 'Creator of AesirX',
//   },
// ];
// const menuLogin = [
//   {
//     title: 'Continue Concordium Wallet ',
//     icon: '/assets/images/wallet.png',
//     color: 'blue-50',
//   },
// ];

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: process.env.REACT_APP_DEMO_USER ?? '',
      password: process.env.REACT_APP_DEMO_PASSWORD ?? '',
      remember: false,
      isProcessing: false,
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    if (this.validator.allValid()) {
      await login(this.state);
    } else {
      this.validator.showMessages();
      return;
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { t } = this.props;
    const onGetData = async (response) => {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
      window.location.reload();
    };
    return (
      <div className="container h-100vh">
        {/* <BannerLeft dataSlider={dataSlider} /> */}
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-block ">
            <h1 className="fs-2 fw-normal mb-24 lh-sm fw-semibold text-center">
              {t('txt_welcome_to')}
              <img
                className="px-1"
                style={{ verticalAlign: 'inherit' }}
                alt="aesirx"
                src="/assets/images/logo/welcome-logo.png"
              />
              {t('txt_login_text_1')} <br /> {t('txt_login_text_2')}
            </h1>
            <div className="mw-480px mx-auto">
              {/* {menuLogin?.map((v) => (
                <button
                  type="button"
                  className={`btn text-white w-100 btn-${v?.color} position-relative d-flex align-item-center justify-content-center wr_btn_login border-1`}
                  key={v?.icon}
                >
                  <div className="d-flex">
                    <ComponentImage
                      src={v.icon}
                      alt={v.icon}
                      className="icon-login"
                      style={{
                        width: '19px',
                        height: '19px',
                      }}
                    />
                    <span className="ms-1">{v?.title}</span>
                  </div>
                </button>
              ))}

              <p className="line">
                <span className="fs-6 fw-medium">OR</span>
              </p> */}
              <form>
                <SSOButton
                  className="btn w-100 fw-bold btn-blue-3 position-relative d-flex align-item-center justify-content-center mb-3 px-6 txt_login mh-xl-50px"
                  text={t('txt_sign_in_with_sso')}
                  onGetData={onGetData}
                />
                <div className="d-flex align-items-center flex-nowrap">
                  <p className="line">
                    <span className="fs-6 fw-medium"> {t('txt_or')}</span>
                  </p>
                </div>
                <label className="form-label pt-3 mb-1 fw-semibold text-black">
                  {t('txt_email')} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  ref={this.usernameInput}
                  onBlur={() => {
                    this.validator.showMessageFor('Email or username');
                  }}
                />
                {this.validator.message('Email or username', this.state.username, 'required', {
                  className: 'text-danger',
                })}
                <label className="form-label mt-3 mb-1 fw-semibold text-black" htmlFor="password">
                  {t('txt_password')} <span className="text-danger">*</span>
                </label>
                <InputPassword
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  onKeyPress={this.onKeyPress}
                  onBlur={() => {
                    this.validator.showMessageFor('password');
                  }}
                />
                {this.validator.message('password', this.state.password, 'required', {
                  className: 'text-danger',
                })}
                <div className="d-flex justify-content-between pt-4">
                  <Checkbox text={t('txt_remember')} />
                  <a
                    href="https://mcms.aesirx.io/auth/forgotpassword"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex fw-semibold fs-6"
                  >
                    {t('txt_forgot')}
                  </a>
                </div>
                <button
                  type="button"
                  className={`btn w-100 fw-bold btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login mt-24 h-54px text-uppercase align-items-center`}
                  onClick={this.handleSubmit}
                >
                  <span>{t('txt_sign_in')}</span>
                  <div className="ps-2 btn_loading">
                    <div
                      className="spinner-border"
                      style={{ width: '1.7rem', height: '1.7rem' }}
                      role="status"
                    >
                      <span className="visually-hidden"> {t('txt_load')}</span>
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(LoginPage);
