import Cookies from "js-cookie";

export const getToken = (tokenKey = "access_token") => {
  return Cookies.get(tokenKey);
};

export const setToken = (tokenKey = "access_token", token: string) => {
  return Cookies.set(tokenKey, token);
};
