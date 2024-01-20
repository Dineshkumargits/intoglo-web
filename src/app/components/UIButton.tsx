import { Button, ButtonProps } from "@mui/joy";
import { useState } from "react";

export interface UIButtonProps extends ButtonProps {
  children: React.ReactNode;
}
export const UIButton = (props: UIButtonProps) => {
  return (
    <Button {...props} disabled={props?.disabled || props?.loading}>
      {props?.children}
    </Button>
  );
};

interface UILoaderButtonProps extends UIButtonProps {}
export const UIPromiseButton = (props: UILoaderButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <UIButton
      {...props}
      onClick={(event) => {
        setLoading(true);
        (document as any).activeElement.blur();
        try {
          if (props?.onClick) {
            (props?.onClick(event) as any).finally(() => {
              setLoading(false);
            });
          }
        } catch (e) {
          setLoading(false);
        }
      }}
      loading={loading}
    />
  );
};
