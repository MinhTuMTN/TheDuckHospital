import React from "react";
import SearchNotFound from "../../components/Nurse/SearchNotFound";
import { Box, Typography } from "@mui/material";

function NotificationPage(props) {
  return (
    <Box
      py={4}
      px={{
        md: 5,
        xs: 1.5,
      }}
      sx={{ width: "100%" }}
    >
      <Typography variant="h6" fontSize={22}>
        Thông báo
      </Typography>

      <Box mt={2}>
        <SearchNotFound text="Không có thông báo nào để hiển thị" />;
      </Box>
    </Box>
  );
}

export default NotificationPage;
