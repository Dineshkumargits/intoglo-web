"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignUp } from "../components/auth/Signup";
import { getAuthenticatedUser } from "../lib/common";
export default function SignUpPage() {
  const router = useRouter();
  const redirectIfAuthenticated = async () => {
    const isUserAuthenticated = await getAuthenticatedUser();
    if (isUserAuthenticated?.authenticated) {
      router.replace("/");
    }
  };
  useEffect(() => {
    redirectIfAuthenticated();
  }, []);
  return (
    <>
      <SignUp />
    </>
  );
}
