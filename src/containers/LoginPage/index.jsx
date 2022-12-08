import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import BannerLeft from '../../components/BannerLeft';
import './index.scss';

import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';
import ComponentImage from 'components/ComponentImage';
import { Link } from 'react-router-dom';
import Checkbox from 'components/Checkbox';
import GoogleLoginButton from 'components/GoogleLogin';
import FaceLoginButton from 'components/FacebookLogin';
// import ComponentImage from 'components/ComponentImage';
const dataSlider = [
  {
    text: "I created DMA to help transform any marketing team! It's easy to use, saves on time, resources and money, and can be fully customized to fit any business's needs.",
    title: 'Ronni K. Gothard Christiansen',
    subtitle: 'Creator of AesirX',
  },
];
const menuLogin = [
  {
    title: 'Continue Concordium Wallet ',
    icon: '/assets/images/wallet.png',
    color: 'blue-50',
  },
];

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    return (
      <div className="row">
        <BannerLeft dataSlider={dataSlider} />
        <div className="col-12 col-xl-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-block">
            <h1 className="fs-2 fw-normal text-start mb-24 lh-sm fw-semibold">
              {t('txt_welcome_to')}
              <img
                className="px-1"
                style={{ verticalAlign: 'inherit' }}
                alt="aesirx"
                src="/assets/images/logo/welcome-logo.png"
              />
              {t('txt_login_text_1')} <br /> {t('txt_login_text_2')}
            </h1>
            <div className="w-480px">
              {menuLogin?.map((v) => (
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
              <FaceLoginButton className="w-100 text-center mt-16 fs-18px fw-normal text-black" />
              <GoogleLoginButton className="w-100 mt-16 fs-18px fw-normal rounded-1" />
              <p className="line">
                <span className="fs-6 fw-medium">OR</span>
              </p>
              <form>
                <label className="form-label mb-1 fw-semibold">
                  Email <span className="text-danger">*</span>
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
                <label className="form-label mt-2 mb-1 fw-semibold" htmlFor="password">
                  Password <span className="text-danger">*</span>
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
                <div className="d-flex justify-content-between pt-16">
                  <Checkbox text="Remember me" />
                  <Link to={'#'} className="d-flex fw-semibold fs-6">
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="button"
                  className={`btn w-100 fw-bold btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login mt-24`}
                  onClick={this.handleSubmit}
                >
                  {t('txt_sign_in')}
                  <div className="ps-2 btn_loading">
                    <div
                      className="spinner-border"
                      style={{ width: '1.7rem', height: '1.7rem' }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
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
