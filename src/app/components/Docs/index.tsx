"use client";

import { get } from "@/app/api/api";
import { Documents } from "@/app/types/documents";
import { API_ROUTES } from "@/app/utils/constants";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Card, IconButton, List, ListItem, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { UIButton } from "../UIButton";
import { CreateDocBoxModal } from "./CreateDocBoxModal";
import ComponentWithLoader from "../ComponentWithLoader";
import { EditDocBoxModal } from "./EditDocBoxModal";

export function DocsComponent() {
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
            return <DocItem doc={doc} onClick={() => {}} onEdit={fetchDocs} />;
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
  onEdit,
}: {
  doc: Documents;
  onClick: () => void;
  onEdit: () => void;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
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
            onEdit={onEdit}
          />
        </Stack>
      </Card>
    </ListItem>
  );
};
