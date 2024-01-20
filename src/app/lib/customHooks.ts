import { useState, useEffect } from "react";
import { getAuthenticatedUser } from "./common";
import { APP_ROUTES } from "../utils/constants";
import { useRouter } from "next/navigation";
import { User } from "../types/authentication";

export function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAutenticated] = useState(false);

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        router.replace(APP_ROUTES.SIGN_IN);
        return;
      }
      setUser(user);
      setAutenticated(authenticated);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}
