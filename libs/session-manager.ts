const sessionKey = "Alpha-coffee-session";

export const getSessionToken = () => {
  return window.sessionStorage.getItem(sessionKey);
};

export const setSessionToken = (token: string) => {
  return window.sessionStorage.setItem(sessionKey, token);
};
