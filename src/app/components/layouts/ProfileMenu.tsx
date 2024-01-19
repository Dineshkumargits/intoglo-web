"use client";
import { Avatar, Box, Button, ListDivider, Menu, MenuItem } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuthenticatedUser,
  getProfileName,
  getUserName,
} from "@/app/lib/common";
import { APP_ROUTES } from "@/app/utils/constants";
import { User } from "@/app/types/authentication";
import ComponentWithLoader from "../ComponentWithLoader";
import { removeToken } from "../storage";

export const ProfileMenu = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    removeToken();
    router.replace(APP_ROUTES.SIGN_IN);
  };
  const redirectIfAuthenticated = async () => {
    const isUserAuthenticated = await getAuthenticatedUser();
    setUser(isUserAuthenticated.user);
  };
  useEffect(() => {
    redirectIfAuthenticated().finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <Box>
      <ComponentWithLoader loading={loading} loaderSize="sm">
        {!user ? (
          <Button
            onClick={() => {
              router.push(APP_ROUTES.SIGN_IN);
            }}
          >
            Login
          </Button>
        ) : (
          <>
            <Avatar
              alt="profile-menu"
              id="profile-menu-button"
              aria-controls={open ? "profile_menu_id" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="outlined"
              color="neutral"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              {getProfileName(getUserName(user?.first_name, user?.last_name))}
            </Avatar>
            <Menu
              id="profile_menu_id"
              size="sm"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-labelledby="profile-menu-button"
            >
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/preferences");
                  handleClose();
                }}
              >
                Preferences
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/users");
                  handleClose();
                }}
              >
                Users
              </MenuItem>
              <ListDivider />
              <MenuItem
                onClick={() => {
                  onLogout();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </ComponentWithLoader>
    </Box>
  );
};
