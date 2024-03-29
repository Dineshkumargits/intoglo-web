"use client";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Box, IconButton, Typography } from "@mui/joy";
import * as React from "react";
import { Toaster } from "sonner";
import { Provider } from "./components/Provider";
import BaseLayout from "./components/layouts/BaseLayout";
import { ProfileMenu } from "./components/layouts/ProfileMenu";
import { APP_NAME, APP_ROUTES, BODY_BACKGROUND } from "./utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { NextSeo } from "next-seo";
// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  return (
    <html lang="en">
      <NextSeo title="IntoDocs" description={"IntoDocs"} />
      <body>
        <ThemeRegistry>
          <Provider>
            <BaseLayout.Root>
              {![APP_ROUTES.SIGN_IN, APP_ROUTES.SIGN_UP].includes(
                pathname || ""
              ) && (
                <BaseLayout.Header
                  sx={{
                    bgcolor: { xs: BODY_BACKGROUND, lg: "unset" },
                    borderBottom: "0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      component="h1"
                      fontWeight="xl"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      {APP_NAME}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <ProfileMenu />
                  </Box>
                </BaseLayout.Header>
              )}
              <BaseLayout.Main
                sx={{
                  maxWidth: 1300,
                  margin: "auto",
                  width: { xs: "90%", xl: "100%" },
                  flexGrow: 1,
                }}
              >
                {children}
              </BaseLayout.Main>
            </BaseLayout.Root>
          </Provider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
