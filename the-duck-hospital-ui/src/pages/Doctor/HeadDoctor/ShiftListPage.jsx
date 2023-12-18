import { useTheme } from "@emotion/react";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

function ShiftListPage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Stack
      direction="column"
      sx={{
        py: 3,
        px: isFullScreen ? 5 : 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontSize: "32px",
            color: "#474747",
          }}
          fontWeight="600"
        >
          Danh sách ca trực
        </Typography>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{ mt: 3, justifyContent: "space-between" }}
      >
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ShiftListPage;
