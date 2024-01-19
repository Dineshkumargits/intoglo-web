import { getToken } from "../components/storage";
import { API_ROUTES } from "../utils/constants";
import axios from "axios";

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getToken();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: "GET",
      url: API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { authenticated = false } = response.data.data;
    return authenticated ? response.data.data : false;
  } catch (err) {
    console.log("getAuthenticatedUser, Something Went Wrong", err);
    return defaultReturnObject;
  }
}

export const getUserName = (first_name: string, last_name: string) => {
  return `${first_name} ${last_name}`.trim();
};

export const getProfileName = (name: string) => {
  const nameArr = name?.split(" ");
  return (
    nameArr?.[0]?.charAt(0)?.toUpperCase() +
    nameArr?.[1]?.charAt(0)?.toUpperCase()
  );
};
