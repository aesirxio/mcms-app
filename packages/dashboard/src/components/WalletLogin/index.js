import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { notify } from 'components/Toast';
import history from 'routes/history';
import { Storage } from 'aesirx-dma-lib';
import './index.scss';

const WalletLoginButton = ({ className }) => {
  //   const clientId = "1246711655891487";
  const responseFacebook = (res) => {
    if (res?.profileObj) {
      Storage.setItem('auth', true);
      document.body.classList.remove('body_login_page');
      history.push('/');
      return true;
    } else {
      notify('Login information is incorrect', 'error');
      document.body.classList.remove('body_login_page');
      return false;
    }
  };

  return (
    <div className={`${className} w-buttonFb`}>
      <FacebookLogin
        clientId="1246711655891487"
        // autoLoad={true}
        fields="name,email,picture"
        scope="public_profile"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default WalletLoginButton;
