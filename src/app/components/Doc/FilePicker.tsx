import { randomString } from "@/app/lib/common";
import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Slide } from "@mui/material";
import { useEffect, useState } from "react";
import Dropzone, { ErrorCode, FileRejection } from "react-dropzone";
type FileType = { file: File; key: string };
export const ONE_MB_IN_BYTES = 1048576;
type Props = {
  files?: FileType[];
  onChangeFiles?: (files: FileType[]) => void;
  maxFileSize?: number;
  maxFiles?: number;
};
export const FilePicker = (props: Props) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [removingFileKeys, setRemovingFileKeys] = useState<string[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const [hideAction, setHideAction] = useState(true);

  const handleFilePickerChange = (selectedFiles: File[]) => {
    setHideAction(false);
    const tempFiles = [];
    for (const f of selectedFiles) {
      tempFiles?.push({ key: randomString(5), file: f });
    }
    setFiles([...files, ...tempFiles]);
    if (props?.onChangeFiles) {
      props?.onChangeFiles([...files, ...tempFiles]);
    }
  };
  const onRemove = async (key: string) => {
    const filteredRemovingKeys = [...removingFileKeys];
    for (const f of files) {
      if (f.key == key) {
        filteredRemovingKeys?.push(f.key);
      }
    }
    setRemovingFileKeys(filteredRemovingKeys);
    const totalFiles = [...files];
    const filteredFiles = totalFiles?.filter(
      (f) => f.key != key && !filteredRemovingKeys?.includes(f.key)
    );
    if (filteredFiles?.length == 0) {
      setHideAction(true);
    }
    setTimeout(() => {
      setFiles(filteredFiles);
    }, 1000);
  };
  return (
    <Box>
      <Dropzone
        accept={{ "image/*": [".jpeg", ".png"] }}
        onDrop={(acceptedFiles, rejectedFiles) => {
          setFileRejections([]);
          setFileRejections([...rejectedFiles]);
          handleFilePickerChange(acceptedFiles);
        }}
        maxSize={(props?.maxFileSize || 3) * ONE_MB_IN_BYTES}
        maxFiles={props?.maxFiles}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Box
                sx={{
                  p: 5,
                  borderRadius: 1,
                  cursor: "pointer",
                  overflow: "hidden",
                  bgcolor: "rgba(145, 158, 171, 0.08)",
                  border: "1px dashed rgba(145, 158, 171, 0.2)",
                  position: "relative",
                  outline: "none",
                  transition:
                    "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
                role="presentation"
              >
                <Box component={"label"} sx={{ cursor: "pointer" }}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexFlow: "column wrap",
                      gap: 3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/file.svg"
                      style={{ maxWidth: 200, width: "100%", height: "100%" }}
                    />
                    <Stack sx={{ gap: 1, textAlign: "center" }}>
                      <Typography level="title-lg">
                        Drop or Select file
                      </Typography>
                      <Typography level="body-sm">
                        Drop files here or <Link>browse</Link> through your
                        machine
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </div>
          </section>
        )}
      </Dropzone>
      {files?.length || fileRejections?.length ? (
        <Box
          sx={{ my: 2, rowGap: 1, display: "flex", flexDirection: "column" }}
        >
          <Stack gap={1} sx={{ maxHeight: 200, overflow: "auto" }}>
            {fileRejections?.map((file, i) => (
              <Alert color="danger" key={`dropzone-error-${i}`} size="sm">
                <Stack>
                  <span>{file?.file?.name}</span>
                  <span>{file?.errors?.map((e) => e.message)?.join("-")}</span>
                </Stack>
              </Alert>
            ))}
          </Stack>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {files?.map((file, i) => (
              <Preview
                key={`FilePickerPreview-${file?.key}`}
                file={file}
                onRemove={() => {
                  onRemove(file.key);
                }}
              />
            ))}
          </Box>
          {files?.length > 0 && !hideAction && (
            <Stack
              direction={"row"}
              sx={{ justifyContent: "flex-end", gap: 3 }}
            >
              <Button
                size="sm"
                variant="outlined"
                onClick={() => {
                  setFiles([]);
                  setFileRejections([]);
                  setRemovingFileKeys([]);
                }}
              >
                Remove all
              </Button>
              <Button size="sm">Upload</Button>
            </Stack>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

type PreviewProps = {
  file: FileType;
  onRemove: () => void;
};
const Preview = (props: PreviewProps) => {
  const [transitionState, setTransitionState] = useState(true);
  return (
    <Tooltip title={props?.file?.file?.name}>
      <Slide direction={"up"} in={transitionState} unmountOnExit>
        <Stack
          sx={{
            m: 1,
            width: 80,
            heigth: 80,
            borderRadius: 2.5,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(145, 158, 171, 0.16)",
          }}
        >
          <span
            className="MuiStack-root"
            style={{
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              height: "inherit",
            }}
          >
            <img
              src={URL.createObjectURL(props?.file?.file)}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />
          </span>
          <IconButton
            size="sm"
            sx={{
              zIndex: 2,
              position: "absolute",
              top: 2,
              right: 2,
              p: 0.5,
              bgcolor: "rgba(22, 28, 36, 0.48)",
              borderRadius: "50%",
              color: "rgb(255, 255, 255)",
              "--IconButton-size": 15,
              "&:hover": {
                backgroundColor: "rgba(22, 28, 36, 0.72)",
                color: "rgb(255, 255, 255)",
              },
            }}
            onClick={() => {
              setTransitionState(false);
              props?.onRemove();
            }}
          >
            <Close fontSize="small" sx={{ height: 15, width: 15 }} />
          </IconButton>
        </Stack>
      </Slide>
    </Tooltip>
  );
};
