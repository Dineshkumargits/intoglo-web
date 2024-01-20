import { UIModal } from "../UIModal";
import { FilePicker } from "./FilePicker";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const DocumentUploadModal = (props: Props) => {
  return (
    <UIModal open={props?.open} onClose={props?.onClose}>
      <FilePicker />
    </UIModal>
  );
};
