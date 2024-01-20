export interface Documents {
  document_id: number;
  s3_url?: string;
  is_doc_box?: boolean;
  parent_document?: number;
  user_id?: number;
  name: string;
}
