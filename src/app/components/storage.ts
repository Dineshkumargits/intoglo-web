import { authData, User } from "../types/authentication";

export const getAppName = () => {
  return process.env.NEXT_PUBLIC_APPNAME;
};

export const getToken = () => {
  return localStorage.getItem(`${getAppName()}-Token`);
};

export const getUser = () => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    let user = localStorage.getItem(`${getAppName()}-User`);
    if (user) {
      return JSON.parse(user);
    } else {
      return {};
    }
  }
};

export const getUserId = () => {
  let user = localStorage.getItem(`${getAppName()}-User`);
  if (user) {
    let userObject = JSON.parse(user);
    return userObject.id;
  } else {
    return null;
  }
};

export const saveUserAuthData = (userAuthData: authData) => {
  localStorage.setItem(`${getAppName()}-Token`, userAuthData.token);
  localStorage.setItem(
    `${getAppName()}-User`,
    JSON.stringify(userAuthData.user)
  );
};

export const removeToken = () => {
  return localStorage.removeItem(`${getAppName()}-Token`);
};

export const removeUser = () => {
  return localStorage.removeItem(`${getAppName()}-User`);
};
