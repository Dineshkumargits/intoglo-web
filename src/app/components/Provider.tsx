"use client";
import React, { ReactNode } from "react";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { CssVarsProvider } from "@mui/joy";
import { Toaster } from "sonner";
export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <React.StrictMode>
      <MaterialCssVarsProvider
        theme={{
          [THEME_ID]: theme,
        }}
      >
        <CssVarsProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Toaster richColors position="top-right" />
            {children}
          </ThemeProvider>
        </CssVarsProvider>
      </MaterialCssVarsProvider>
    </React.StrictMode>
  );
};
