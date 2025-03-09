import React from "react";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {decodeJwt} from "jose";
import axios from "axios";

function Login() {
  const handleSuccess = (CredentialResponse: CredentialResponse) => {
    const {credential} = CredentialResponse;
    // console.log(`Bearer ${credential}`);
    const decoded = credential ? decodeJwt(credential) : undefined;
    if (decoded) {
      console.log(decoded);
      axios.get("http://localhost:8001/api/v1/login/verify", {
        headers: { Authorization: `Bearer ${credential}` }, withCredentials: true,
      }).then((response) => {        
        console.log(response.data);
      }).catch((error) => {       
        console.log(error);
      });
    }
  };

  return <div>
    Login
    <GoogleLogin 
    onSuccess={handleSuccess}
    onError={() => console.log("Login failed")}
    useOneTap
    />
  </div>;
}

export default Login;
