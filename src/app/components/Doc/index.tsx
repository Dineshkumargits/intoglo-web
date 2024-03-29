"use client";
import { deleteRequest, get } from "@/app/api/api";
import { Documents } from "@/app/types/documents";
import { API_ROUTES } from "@/app/utils/constants";
import {
  MimeToIconDefinitionMap,
  fileTypeConversion,
} from "@/app/utils/icon_set";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackIos, Delete, Upload } from "@mui/icons-material";
import { Card, IconButton, List, ListItem, Stack, Typography } from "@mui/joy";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ComponentWithLoader from "../ComponentWithLoader";
import { UIButton, UIPromiseButton } from "../UIButton";
import { UIModal, UIModalActionArea } from "../UIModal";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { Portal } from "@mui/material";
import { Lightbox } from "react-modal-image";
import Link from "next/link";
import moment from "moment";

export const DocComponent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [filePickerOpen, setFilePickerOpen] = useState(false);
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDocuments();
  }, []);
  const fetchDocuments = async () => {
    if (params?.doc_id) {
      get({ url: `${API_ROUTES.LIST_DOCUMENTS}/${params?.doc_id}` })
        .then((response) => {
          if (response?.data) {
            setDocuments(response?.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Invalid page url");
    }
  };
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        spacing={2}
        rowGap={2}
      >
        <Typography
          level="h3"
          startDecorator={
            <Link
              href={"/docbox"}
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <ArrowBackIos />
            </Link>
          }
        >
          {searchParams.get("name") || "Documents"}
        </Typography>
        <UIButton
          onClick={() => {
            setFilePickerOpen(true);
          }}
          startDecorator={<Upload />}
        >
          Upload New Document
        </UIButton>
      </Stack>
      <ComponentWithLoader loading={loading}>
        <List
          sx={{
            border: "sm",
          }}
        >
          {documents?.map((doc) => {
            return (
              <DocumentItem
                key={doc.document_id}
                doc={doc}
                onClick={() => {}}
                refresh={fetchDocuments}
              />
            );
          })}
        </List>
      </ComponentWithLoader>
      {documents?.length == 0 && !loading && (
        <Stack alignItems={"center"}>
          <Typography>No Documents Found</Typography>
        </Stack>
      )}
      <DocumentUploadModal
        open={filePickerOpen}
        onClose={() => {
          setFilePickerOpen(false);
        }}
        refresh={fetchDocuments}
      />
    </Stack>
  );
};

const DocumentItem = ({
  doc,
  onClick,
  refresh,
}: {
  doc: Documents;
  onClick: () => void;
  refresh: () => void;
}) => {
  const [openImageView, setOpenImageView] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const onDelete = async (e: any) => {
    e.stopPropagation();
    return deleteRequest({
      url: `${API_ROUTES.DELETE_DOCUMENT}/${doc.document_id}`,
    }).then(() => {
      toast.success("Document deleted");
      refresh();
      setConfirmOpen(false);
    });
  };
  const onClickItem = () => {
    if (doc.type?.startsWith("image")) {
      setOpenImageView(true);
    } else if (doc?.type == "application/pdf") {
      setOpenPdf(true);
    } else {
      window.open(doc?.s3_url, "_blank");
    }
  };
  return (
    <ListItem sx={{}} onClick={onClickItem}>
      <Card
        sx={{
          "&:hover": { boxShadow: "md" },
          borderRadius: "sm",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          rowGap={1}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <FontAwesomeIcon
              size="2x"
              icon={
                MimeToIconDefinitionMap[fileTypeConversion(doc?.type || "")] ||
                faFile
              }
            />
            <Typography fontWeight={"lg"}>{doc?.name}</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>
              {moment(doc?.createdAt).format("MMM DD, YYYY")}
            </Typography>
            <IconButton
              size="sm"
              color="danger"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
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
              Are you sure you want to delete this document
            </Typography>
          </UIModal>
        </Stack>
      </Card>
      {openImageView && (
        <Portal>
          <Lightbox
            medium={doc.s3_url}
            large={doc.s3_url}
            alt={doc?.name || ""}
            onClose={(e: any) => {
              if (e) {
                e.stopPropagation();
              }
              setOpenImageView(false);
            }}
            hideZoom
          />
        </Portal>
      )}
      <UIModal
        open={openPdf}
        onClose={(e: any) => {
          e.stopPropagation();
          setOpenPdf(false);
        }}
        dialogSx={{ width: "100%", height: "100%" }}
      >
        <iframe src={doc.s3_url} width="100%" height="100%" />
      </UIModal>
    </ListItem>
  );
};
