"use client";
import { Stack, Typography } from "@mui/joy";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FilePicker } from "./FilePicker";
import { UIButton } from "../UIButton";
import { useState } from "react";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { Upload } from "@mui/icons-material";

export const DocComponent = () => {
  const params = useParams();
  const [filePickerOpen, setFilePickerOpen] = useState(false);
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography level="h3">Documents</Typography>
        <UIButton
          onClick={() => {
            setFilePickerOpen(true);
          }}
          startDecorator={<Upload />}
        >
          Upload New Document
        </UIButton>
      </Stack>
      <DocumentUploadModal
        open={filePickerOpen}
        onClose={() => {
          setFilePickerOpen(false);
        }}
      />
    </>
  );
};
