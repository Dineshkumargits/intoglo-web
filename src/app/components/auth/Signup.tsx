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

import { API_ROUTES } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { saveUserAuthData } from "../../components/storage";
import { EMAIL_PATTERN } from "../../utils/validations";
import { useState } from "react";

type FormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export function SignUp() {
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
      .post(API_ROUTES.SIGN_UP, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        saveUserAuthData({
          token: response?.data?.data?.token,
          user: response?.data?.data?.user?.user_id,
        });
        router.replace("/");
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
            <strong>Welcome 👋</strong>
          </Typography>
          <Typography level="body-sm">Sign up for an account.</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                error={!!errors?.first_name}
                placeholder="John"
                sx={{}}
                {...register("first_name", { required: true })}
              />
              {errors?.first_name && (
                <FormHelperText>Please enter the first name</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                error={!!errors?.last_name}
                placeholder="Doe"
                sx={{}}
                {...register("last_name", { required: true })}
              />
              {errors?.last_name && (
                <FormHelperText>Please enter the last name</FormHelperText>
              )}
            </FormControl>
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
              Create account
            </Button>
          </Stack>
        </form>
        <Typography
          endDecorator={<Link href="/sign-in">Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Already have an account?
        </Typography>
      </Sheet>
    </Sheet>
  );
}
