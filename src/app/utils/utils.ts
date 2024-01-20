import axios from "axios";
import { toast } from "sonner";

export const uploadFileToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  let authToken = localStorage.getItem("authToken");
  let headers = authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    })
    .then((uploadedData) => {
      if (uploadedData.data.status == "SUCCESS") {
        uploadedData.data.fileUrl = `${getOriginFromUrl(
          uploadedData.data.data.signedUrl
        )}/${uploadedData.data.data.unsignedUrl}`;
        return uploadedData.data;
      }
    })
    .catch((err) => {
      // console.log("hoa-err", err)
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
      return false;
    });
};

export const getOriginFromUrl = (url: string) => {
  const fullUrl = new URL(url);
  return fullUrl.origin;
};
