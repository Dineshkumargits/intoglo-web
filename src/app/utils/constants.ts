const host_url = process.env.NEXT_PUBLIC_API_URL;
export const API_ROUTES = {
  SIGN_UP: host_url + "/api/auth/signup",
  SIGN_IN: host_url + "/api/auth/signin",
  SIGN_OUT: host_url + "/api/auth/signout",
  GET_USER: host_url + "/api/auth/getuser",
  LIST_DOCS: host_url + "/api/documents/list_doc_box",
  CREATE_DOC_BOX: host_url + "/api/documents/create_doc_box",
  UPDATE_DOC_BOX: host_url + "/api/documents/update_doc_box",
  DELETE_DOC_BOX: host_url + "/api/documents/delete_doc_box",
  UPLOAD_DOCS: host_url + "/api/documents/upload_documents",
  GET_ALL_CLIENTS: host_url + "/api/get_all_clients",
};

export const APP_ROUTES = {
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  HOME: "/",
  DOCS: "/docs",
  DOCBOX: "/docbox",
};

export const APP_NAME = process.env.NEXT_PUBLIC_APPNAME || "";

export const BODY_BACKGROUND = "#f7f7f8";
