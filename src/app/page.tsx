"use client";
import { Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import { APP_ROUTES } from "./utils/constants";
import { useUser } from "./lib/customHooks";

export default function Home() {
  useUser();
  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography level="h4">Welcome to IntoDocs</Typography>
      <Link href={APP_ROUTES.DOCBOX}>
        <Button>View Docs</Button>
      </Link>
    </Stack>
  );
}
