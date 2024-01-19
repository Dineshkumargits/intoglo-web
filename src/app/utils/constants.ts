const host_url = process.env.NEXT_PUBLIC_API_URL;
export const API_ROUTES = {
  SIGN_UP: host_url + "/api/auth/signup",
  SIGN_IN: host_url + "/api/auth/signin",
  SIGN_OUT: host_url + "/api/auth/signout",
  GET_USER: host_url + "/api/auth/getuser",
};

export const APP_ROUTES = {
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  HOME: "/",
};

export const APP_NAME = process.env.NEXT_PUBLIC_APPNAME || "";
