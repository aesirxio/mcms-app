import React, { useState } from "react";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const responseGoogle = (res) => {
    console.log(res);
    setName(res.profileObj.name);
    setEmail(res.profileObj.email);
    setUrl(res.profileObj.imageUrl);
  };
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      <img src={url} alt={name} />
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
