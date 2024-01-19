import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { SignIn, UserButton } from "@clerk/nextjs";
import { Stack } from "@mui/joy";

export default function Home() {
  return (
    // <Sheet
    //   sx={{
    //     display: "flex",
    //     flexFlow: "row nowrap",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     minHeight: "100vh",
    //   }}
    // >
    //   <Sheet
    //     sx={{
    //       width: 300,
    //       mx: "auto",
    //       my: 4,
    //       py: 3,
    //       px: 2,
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: 2,
    //       borderRadius: "sm",
    //       boxShadow: "md",
    //     }}
    //     variant="outlined"
    //   >
    //     <div>
    //       <Typography level="h4" component="h1">
    //         <strong>Welcome back 👋</strong>
    //       </Typography>
    //       <Typography level="body-sm">Sign in to continue.</Typography>
    //     </div>
    //     <FormControl id="email">
    //       <FormLabel>Email</FormLabel>
    //       <Input name="email" type="email" placeholder="johndoe@email.com" />
    //     </FormControl>
    //     <FormControl id="password">
    //       <FormLabel>Password</FormLabel>
    //       <Input name="password" type="password" placeholder="password" />
    //     </FormControl>
    //     <Button sx={{ mt: 1 }}>Log in</Button>
    //     <Typography
    //       endDecorator={<Link href="/sign-up">Sign up</Link>}
    //       fontSize="sm"
    //       sx={{ alignSelf: 'center' }}
    //     >
    //       Don&apos;t have an account?
    //     </Typography>
    //   </Sheet>
    // </Sheet>
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <SignIn />
    </Stack>
  );
}
