import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import './index.scss';

import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';
import Checkbox from 'components/Checkbox';
import { SSOButton } from 'aesirx-sso';
import { Storage, AesirxAuthenticationApiService } from 'aesirx-dma-lib';
import { withThemeContext } from 'themes/ThemeContextProvider';
import { env } from 'env';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: env.REACT_APP_DEMO_USER ?? '',
      password: env.REACT_APP_DEMO_PASSWORD ?? '',
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
    const { t, theme } = this.props;
    const stylesImage = {
      verticalAlign: 'inherit',
      filter: theme?.theme !== 'dark' ? 'unset' : 'brightness(0) invert(1)',
    };

    const onGetData = async (response) => {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
      window.location.reload();
    };
    return (
      <div className="container h-100vh">
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="d-block ">
            <h1 className="fs-2 mb-24 lh-sm fw-semibold text-center">
              {t('txt_welcome_to')}
              <img
                className="px-1"
                style={stylesImage}
                alt="aesirx"
                src="/assets/images/logo/welcome-logo.png"
              />
              {t('txt_login_text_1')} <br /> {t('txt_login_text_2')}
            </h1>
            <div className="mw-480px mx-auto">
              <form>
                <SSOButton
                  className="btn btn-blue-3 fw-bold fs-md w-100 lh-sm mb-3"
                  text={t('txt_sign_in_with_sso')}
                  onGetData={onGetData}
                />
                <div className="position-relative text-center mb-3">
                  <p className="line position-absolute top-50 mb-0"></p>
                  <span
                    style={{ backgroundColor: 'var(--bs-body-bg)' }}
                    className="fs-6 fw-medium text-uppercase px-3 py-2 text-gray-600 position-relative z-1"
                  >
                    {t('txt_or')}
                  </span>
                </div>
                <label className="form-label mb-10 fw-semibold text-black">
                  {t('txt_email')} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control mb-4"
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
                <label className="form-label mb-10 fw-semibold text-black" htmlFor="password">
                  {t('txt_password')} <span className="text-danger">*</span>
                </label>
                <InputPassword
                  type="password"
                  className="form-control mb-4"
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
                <div className="d-flex justify-content-between align-items-center">
                  <Checkbox text={t('txt_remember')} />
                  <a
                    href="https://mcms.aesirx.io/auth/forgotpassword"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex fw-semibold fs-6 text-blue-3"
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

export default withThemeContext(withTranslation('common')(LoginPage));
