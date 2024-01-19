import { SignIn } from "@clerk/nextjs";
import { Sheet } from "@mui/joy";

export default function SignInPage() {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SignIn />
    </Sheet>
  );
}
