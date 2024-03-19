import Cookies from "js-cookie";

export const getToken = (tokenKey = "Alpha_coffee") => {
  return Cookies.get(tokenKey);
};

export const setToken = (tokenKey = "Alpha_coffee", token: string) => {
  return Cookies.set(tokenKey, token);
};
