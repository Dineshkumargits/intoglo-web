import { CircularProgress } from "@mui/joy";
import React, { CSSProperties, ReactElement, ReactNode } from "react";

interface Props {
  loading: boolean;
  loaderSize?: "sm" | "md" | "lg";
  loaderComponent?: ReactNode | ReactElement;
  children: ReactNode | ReactElement;
  loaderStyle?: CSSProperties;
}
function ComponentWithLoader(props: Props) {
  const { loading, loaderComponent, children, loaderSize, loaderStyle } = props;
  return (
    <>
      {loading ? (
        loaderComponent ? (
          loaderComponent
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...loaderStyle,
            }}
          >
            <CircularProgress size={loaderSize || "md"} />
          </div>
        )
      ) : (
        children
      )}
    </>
  );
}

export default ComponentWithLoader;
