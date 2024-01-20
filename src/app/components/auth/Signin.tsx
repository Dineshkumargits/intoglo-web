"use client";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_PATTERN } from "../../utils/validations";
import axios from "axios";
import { toast } from "sonner";
import { saveUserAuthData } from "../storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_ROUTES } from "@/app/utils/constants";

type FormInputs = {
  email: string;
  password: string;
};

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    axios
      .post(API_ROUTES.SIGN_IN, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        saveUserAuthData({
          token: response?.data?.data?.token,
          user: response?.data?.data?.user?.user_id,
        });
        router.push("/");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Try again"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
      <Sheet
        sx={{
          width: 300,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <strong>Welcome back 👋</strong>
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="johndoe@email.com"
                {...register("email", {
                  required: true,
                  pattern: EMAIL_PATTERN,
                })}
              />
              {errors?.email && (
                <FormHelperText>
                  {errors?.email?.type == "required"
                    ? "Please enter your email"
                    : "Invalid Email"}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                error={!!errors?.password}
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password && (
                <FormHelperText>
                  {errors?.password?.type == "required"
                    ? "Please enter password"
                    : "Invalid password"}
                </FormHelperText>
              )}
            </FormControl>
            <Button sx={{ mt: 1 }} type="submit" loading={loading}>
              Login
            </Button>
          </Stack>
        </form>
        <Typography
          endDecorator={<Link href="/sign-up">Register</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </Sheet>
  );
}
