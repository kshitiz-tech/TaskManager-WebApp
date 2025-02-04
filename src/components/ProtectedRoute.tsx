import React, { useState, useEffect } from "react";
import api from "../api";
import { Navigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN, USERNAME } from "../constant";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const [IsAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  //check if the request made is authorized or not
  //check if there is refresh token or not, if refresh token exist => check refresh token is expired or not
  //check if expired ==> send request for refresh token, if error => not authorized
  //for that we need refreshtoken

  //to get refreshTOken
  const refreshToken = async () => {
    const RefreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!RefreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: RefreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
    //if request is success refresh token => auth
    //if failure, setIsAuthorized(false)
  };

  //for authorization

  interface DecodedToken {
    exp: number;
    name: string;
  }

  const auth = async () => {
    //get the token
    const token = localStorage.getItem(ACCESS_TOKEN);

    //if theres is no token, no authorization
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    //if there is token decode the token using jwtDecode
    const decoded = jwtDecode<DecodedToken>(token);

    console.log(decoded);
    //check the expiration date
    const tokenExpiration = decoded.exp;
    const user = decoded.name;
    //check todays date
    const now = Date.now() / 1000; // to get it in seconds

    //check if expired or not
    if (tokenExpiration < now) {
      //if expired get new refreshtoken
      await refreshToken();
    }

    //if not expired, authorized
    else {
      setIsAuthorized(true);
      localStorage.setItem(USERNAME, user);
    }

    //check if it is expired or not
    //if expireed (refreshToken)
    //if not expired setIsAuthorirzed(True)
  };

  //just for request for accessing refreshtoken

  //handling the process
  if (IsAuthorized === null) {
    return <div>Loading...</div>;
  }

  return IsAuthorized ? children : <Navigate to="/login/" />;
}

export default ProtectedRoute;
