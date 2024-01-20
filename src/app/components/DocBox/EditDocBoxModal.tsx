import { get, post } from "@/app/api/api";
import { User } from "@/app/types/authentication";
import { Documents } from "@/app/types/documents";
import { API_ROUTES } from "@/app/utils/constants";
import { Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { UIPromiseButton } from "../UIButton";
import { UIModal, UIModalActionArea } from "../UIModal";
import { ClientSelection } from "./ClientSelection";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  document: Documents;
  onEdit: () => void;
};
export const EditDocBoxModal = (props: Props) => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClients, setSelectedClients] = useState<User[]>([]);
  useEffect(() => {
    if (props?.open) {
      fetchClients();
      setSelectedClients(
        props?.document?.DocumentPermissions?.map((d) => d.Users[0]) || []
      );
    }
  }, [props?.open]);
  const fetchClients = async () => {
    await get({ url: API_ROUTES.GET_ALL_CLIENTS }).then((response) => {
      setClients(response?.data?.data);
    });
  };
  const onUpdateDocBox = async () => {
    return post({
      url: API_ROUTES.UPDATE_DOC_BOX,
      body: {
        user_ids: selectedClients?.map((s) => s.user_id),
        document_id: props?.document?.document_id,
      },
    }).then(() => {
      toast.success("Changed access for docbox");
      props?.onEdit();
      props?.onClose();
    });
  };
  return (
    <UIModal
      open={props.open}
      onClose={() => {
        props?.onClose();
      }}
      title={"Change Access"}
      actions={
        <UIModalActionArea>
          <UIPromiseButton onClick={onUpdateDocBox}>Update</UIPromiseButton>
        </UIModalActionArea>
      }
    >
      <Stack spacing={2}>
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
