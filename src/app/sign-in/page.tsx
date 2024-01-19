"use client";
import { SignIn } from "../components/auth/Signin";
import { getAuthenticatedUser } from "../lib/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const redirectIfAuthenticated = async () => {
    const isUserAuthenticated = await getAuthenticatedUser();
    if (isUserAuthenticated?.authenticated) {
      router.replace("/");
    }
  };
  useEffect(() => {
    redirectIfAuthenticated().finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      <SignIn />
    </>
  );
}
