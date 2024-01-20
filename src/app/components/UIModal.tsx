import { Box, ModalClose, Stack, Typography } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { SxProps } from "@mui/joy/styles/types";
import * as React from "react";

type Props = {
  open: boolean;
  onClose: (
    _event: React.MouseEvent<HTMLButtonElement> | {},
    reason: string
  ) => void;
  children: React.ReactNode;
  title?: React.ReactNode | string;
  actions?: React.ReactNode;
  hideClose?: boolean;
  singleClose?: boolean;
  dialogSx?: SxProps;
  size?: "md" | "sm" | "lg";
  disableEscapeKeyDown?: boolean;
};
export function UIModal(props: Props) {
  const {
    onClose,
    open,
    title,
    children,
    actions,
    hideClose,
    singleClose,
    dialogSx,
    size,
  } = props;
  return (
    <Modal
      open={open}
      onClose={(event: any, reason) => {
        if (
          singleClose &&
          ["escapeKeyDown", "backdropClick"].includes(reason)
        ) {
          return;
        }
        event.stopPropagation();
        onClose(event, reason);
      }}
      disableEscapeKeyDown={props?.disableEscapeKeyDown}
      sx={(theme) => ({
        zIndex: { xs: 9996, md: theme.vars.zIndex.modal },
      })}
    >
      <ModalDialog
        size={size || "md"}
        aria-labelledby="fade-modal-dialog-title"
        aria-describedby="fade-modal-dialog-description"
        sx={{
          ...(size
            ? {}
            : {
                width: { xs: "100%", md: 650, lg: 850 },
              }),
          px: 0,
          ...dialogSx,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!hideClose && <ModalClose />}
        <Box sx={{ px: { xs: 1, md: 2 } }}>
          {typeof title == "string" ? (
            <Typography level="h4">{title}</Typography>
          ) : (
            title
          )}
        </Box>
        <Box
          sx={{ flexGrow: 1, overflowY: "auto", px: { xs: 1, md: 2 }, py: 1 }}
        >
          {children}
        </Box>
        {actions && (
          <Box sx={{ flexGrow: 0, mt: 1, px: { xs: 1, md: 2 } }}>{actions}</Box>
        )}
      </ModalDialog>
    </Modal>
  );
}

type ActionAreaProps = {
  children: React.ReactNode;
  sx?: SxProps;
};
export const UIModalActionArea = (props: ActionAreaProps) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        ...props?.sx,
      }}
    >
      {props?.children}
    </Stack>
  );
};
