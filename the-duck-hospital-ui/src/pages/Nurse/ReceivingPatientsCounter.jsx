import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import AddNewProfile from "../../components/Nurse/AddNewProfile";
import InfoItem from "./InfoItem";
function ReceivingPatientsCounter(props) {
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
          Tiếp nhận bệnh nhân
        </Typography>
        <AddNewProfile />
      </Stack>
      <Stack
        direction="row"
        textAlign="center"
        style={{
          marginTop: "40px",
          border: "1px solid #4a4a4a",
          borderRadius: "8px",
        }}
      >
        <TextField
          size="medium"
          id="outlined-basic"
          variant="outlined"
          placeholder="Nhập họ và tên"
          sx={{
            width: "100%",
            flex: isFullScreen ? 3 : 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "6px",
                }}
              >
                TÊN
              </InputAdornment>
            ),
            sx: {
              padding: "4px 2px",
              borderRadius: "0px",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            },
          }}
        />
        <TextField
          size="medium"
          variant="outlined"
          placeholder="Nhập CCCD/CMND"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            flex: isFullScreen ? 2 : 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "6px",
                }}
              >
                CCCD
              </InputAdornment>
            ),
            sx: {
              padding: "4px 2px",
              borderRadius: "0px",
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            flex: 0.5,
            color: "#fff",
            bgcolor: "#0052d5",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            ":hover": {
              bgcolor: "#003c9df5",
            },
          }}
        >
          Tìm kiếm
        </Button>
      </Stack>
      <Grid
        container
        spacing={3}
        sx={{ mt: 3, justifyContent: "space-between" }}
      >
        <Grid item xs={12} md={6}>
          <InfoItem />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoItem />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ReceivingPatientsCounter;
