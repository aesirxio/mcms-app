import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { notify } from "components/Toast";
import history from "routes/history";
import Storage from "aesirx-dma-lib/src/Utils/Storage";
import "./index.scss";

const GoogleLoginButton = ({ className }) => {
  const clientId =
    "746537720400-on1e0j856ksf0h76k3n216bo4olb15f7.apps.googleusercontent.com";
  const clientSecret = "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";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);
  const responseGoogle = (res) => {
    if (res?.profileObj) {
      Storage.setItem("auth", true);
      localStorage.setItem("profile", JSON.stringify(res?.profileObj));
      document.body.classList.remove("body_login_page");
      history.push("/");
      return true;
    } else {
      notify("Login information is incorrect", "error");
      document.body.classList.remove("body_login_page");
      return false;
    }
  };

  return (
    <div className="text-button">
      <GoogleLogin
        className={className}
        clientId={clientId}
        clientSecret={clientSecret}
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        // isSignedIn={true}
      />
    </div>
  );
};

export default GoogleLoginButton;
