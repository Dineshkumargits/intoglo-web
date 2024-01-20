"use client";

import { deleteRequest, get } from "@/app/api/api";
import { Documents } from "@/app/types/documents";
import { API_ROUTES } from "@/app/utils/constants";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Card, IconButton, List, ListItem, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { UIButton, UIPromiseButton } from "../UIButton";
import { CreateDocBoxModal } from "./CreateDocBoxModal";
import ComponentWithLoader from "../ComponentWithLoader";
import { EditDocBoxModal } from "./EditDocBoxModal";
import { UIModal, UIModalActionArea } from "../UIModal";
import { toast } from "sonner";
import Link from "next/link";

export function DocBoxComponent() {
  const [docs, setDocs] = useState<Documents[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModelOpen, setCreateModelOpen] = useState(false);
  useEffect(() => {
    fetchDocs();
  }, []);
  const fetchDocs = async (currentParentId = 0) => {
    get({ url: `${API_ROUTES.LIST_DOCS}/${currentParentId}` })
      .then((response) => {
        if (response?.data) {
          setDocs(response?.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack spacing={2} sx={{}}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography level="h3">Documents</Typography>
        <UIButton
          startDecorator={<Add />}
          onClick={() => {
            setCreateModelOpen(true);
          }}
        >
          Create DocBox
        </UIButton>
      </Stack>
      <ComponentWithLoader loading={loading}>
        <List
          sx={{
            border: "sm",
          }}
        >
          {docs?.map((doc) => {
            return (
              <DocItem
                key={doc.document_id}
                doc={doc}
                onClick={() => {}}
                refresh={fetchDocs}
              />
            );
          })}
        </List>
      </ComponentWithLoader>
      {docs?.length == 0 && !loading && (
        <Stack alignItems={"center"}>
          <Typography>No DocBox Found</Typography>
        </Stack>
      )}
      <CreateDocBoxModal
        open={createModelOpen}
        onClose={() => {
          setCreateModelOpen(false);
        }}
        documents={docs}
        onCreate={() => {
          fetchDocs();
        }}
      />
    </Stack>
  );
}

const DocItem = ({
  doc,
  onClick,
  refresh,
}: {
  doc: Documents;
  onClick: () => void;
  refresh: () => void;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const onDelete = async () => {
    return deleteRequest({
      url: `${API_ROUTES.DELETE_DOC_BOX}/${doc.document_id}`,
    }).then(() => {
      toast.success("Docbox deleted");
      refresh();
      setConfirmOpen(false);
    });
  };
  return (
    <Link href={`/doc/${doc.doc_box_id}`} style={{ textDecoration: "none" }}>
      <ListItem sx={{}} onClick={onClick}>
        <Card
          sx={{
            "&:hover": { boxShadow: "md" },
            borderRadius: "sm",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>{doc?.name}</Typography>
            <Stack direction={"row"}>
              <IconButton
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setEditOpen(true);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                size="sm"
                color="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setConfirmOpen(true);
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
            <EditDocBoxModal
              open={editOpen}
              onClose={() => {
                setEditOpen(false);
              }}
              document={doc}
              onEdit={refresh}
            />
            <UIModal
              open={confirmOpen}
              onClose={() => {
                setConfirmOpen(false);
              }}
              actions={
                <UIModalActionArea>
                  <UIPromiseButton color="danger" onClick={onDelete}>
                    Delete
                  </UIPromiseButton>
                </UIModalActionArea>
              }
              dialogSx={{ width: { xs: "90%", sm: "30%" } }}
            >
              <Typography>
                Are you sure you want to delete this docbox
              </Typography>
            </UIModal>
          </Stack>
        </Card>
      </ListItem>
    </Link>
  );
};
