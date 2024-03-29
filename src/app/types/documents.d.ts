import { User } from "./authentication";

export interface Documents {
  document_id?: number;
  s3_url?: string;
  is_doc_box?: boolean;
  parent_document?: string;
  doc_box_id?: string;
  uploaded_by?: number;
  name: string;
  type?: string;
  size?: number;
  DocumentPermissions?: DocumentPermissions[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentPermissions {
  document_permission_id: number;
  document_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  Users: User[];
}
