import axios, { AxiosResponse } from "axios";
import { getToken } from "../components/storage";
import { toast } from "sonner";

type ApiArgs = {
  url: string;
  body?: any;
};
const get = async ({
  url,
  body,
}: ApiArgs): Promise<AxiosResponse<any, any>> => {
  return new Promise((resolve, reject) => {
    const token = getToken();
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Try again"
        );
        reject(error);
      });
  });
};

const post = ({ url, body }: ApiArgs): Promise<AxiosResponse<any, any>> => {
  return new Promise((resolve, reject) => {
    const token = getToken();
    axios
      .post(
        url,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Try again"
        );
        reject(error);
      });
  });
};

export { get, post };
