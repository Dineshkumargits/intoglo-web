import { get, post } from "@/app/api/api";
import { User } from "@/app/types/authentication";
import { Documents } from "@/app/types/documents";
import { API_ROUTES } from "@/app/utils/constants";
import { FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { UIPromiseButton } from "../UIButton";
import { UIModal, UIModalActionArea } from "../UIModal";
import { ClientSelection } from "./ClientSelection";

type Props = {
  open: boolean;
  onClose: () => void;
  documents: Documents[];
  onCreate: () => void;
};
export const CreateDocBoxModal = (props: Props) => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClients, setSelectedClients] = useState<User[]>([]);
  const getDocName = () => {
    const doc_boxes = props?.documents?.filter((s) => s.is_doc_box);
    return `DocBox-${String(
      (doc_boxes[doc_boxes.length - 1]?.document_id || 0) + 1
    ).padStart(5, "0")}`;
  };
  useEffect(() => {
    if (props?.open) {
      fetchClients();
    }
  }, [props?.open]);
  const fetchClients = async () => {
    await get({ url: API_ROUTES.GET_ALL_CLIENTS }).then((response) => {
      setClients(response?.data?.data);
    });
  };
  const onCreateDocBox = async () => {
    return post({
      url: API_ROUTES.CREATE_DOC_BOX,
      body: { user_ids: selectedClients?.map((s) => s.user_id) },
    }).then(() => {
      props?.onCreate();
      props?.onClose();
    });
  };
  return (
    <UIModal
      open={props.open}
      onClose={() => {
        props?.onClose();
      }}
      title={"Create Doc Box"}
      actions={
        <UIModalActionArea>
          <UIPromiseButton onClick={onCreateDocBox}>Create</UIPromiseButton>
        </UIModalActionArea>
      }
    >
      <Stack spacing={2}>
        <FormControl disabled>
          <FormLabel>DocBox Name</FormLabel>
          <Input value={getDocName()} />
        </FormControl>
        <ClientSelection
          options={clients}
          selectedOptions={selectedClients}
          onChange={(value) => {
            setSelectedClients(value);
          }}
        />
      </Stack>
    </UIModal>
  );
};
