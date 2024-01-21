import { List, Stack, Typography, ListItem, Divider } from "@mui/joy";
import { useEffect, useState } from "react";
import { RecentActivity } from "../types/recent_activities";
import moment from "moment";
import { get } from "../api/api";
import { API_ROUTES } from "../utils/constants";

export const RecentActivities = () => {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  useEffect(() => {
    fetchRecentActivities();
  }, []);
  const fetchRecentActivities = async () => {
    get({ url: API_ROUTES.GET_RECENT_ACTIVITIES }).then((response) => {
      if (response?.data) {
        setActivities(response?.data);
      }
    });
  };
  return (
    <>
      {activities?.length > 0 && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Divider />
          <Typography level="h4">Recent Activities</Typography>
          <List sx={{}}>
            {activities?.map((activity) => (
              <ListItem sx={{}} key={activity.id}>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  sx={{ width: "100%" }}
                >
                  <Typography>{activity.activity_title}</Typography>
                  <Typography>
                    {moment(activity.createdAt).format("MMM DD, YYYY")}
                  </Typography>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </>
  );
};
