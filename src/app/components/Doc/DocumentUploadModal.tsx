import { uploadFileToS3 } from "@/app/utils/utils";
import { UIModal } from "../UIModal";
import { FilePicker, FileType } from "./FilePicker";
import { Documents } from "@/app/types/documents";
import { useParams } from "next/navigation";
import { post } from "@/app/api/api";
import { API_ROUTES } from "@/app/utils/constants";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const DocumentUploadModal = (props: Props) => {
  const params = useParams();
  const onUpload = async (files: FileType[]) => {
    return new Promise(async (resolve, reject) => {
      let updatedFiles: Documents[] = [];
      for (let file of files) {
        await uploadFileToS3(file.file).then((data) => {
          if (data.fileUrl) {
            let f: Documents = {
              name: file.file.name,
              is_doc_box: false,
              parent_document: Number(params.doc_id),
              s3_url: data.fileUrl,
              size: file.file.size,
              type: file.file.type,
            };
            updatedFiles.push(f);
          }
        });
      }
      if (updatedFiles?.length) {
        post({
          url: API_ROUTES.UPLOAD_DOCS,
          body: { files: updatedFiles },
        })
          .then(() => {
            toast.success("Document(s) uploaded");
            props?.onClose();
          })
          .finally(() => {
            resolve("");
          });
      } else {
        resolve("");
      }
    });
  };
  return (
    <UIModal open={props?.open} onClose={props?.onClose}>
      <FilePicker onUpload={onUpload} />
    </UIModal>
  );
};
