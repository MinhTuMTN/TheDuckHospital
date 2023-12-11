import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ReceivingPatientsItem from "./ReceivingPatientsItem";

const SearchTextField = styled(TextField)(({ theme }) => ({}));

function ReceivingPatients(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [searchString, setSearchString] = React.useState("");
  return (
    <Grid
      container
      sx={{
        py: 3,
        px: isFullScreen ? 5 : 3,
        backgroundColor: "#f4fbff",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item flex={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            alignItems: "center !important",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["20px", "28px"],
            }}
            fontWeight="500"
          >
            Tiếp nhận bệnh nhân
          </Typography>
          <SearchTextField
            variant="outlined"
            placeholder="Tìm kiếm theo mã đặt trước"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              style: { fontSize: 14, padding: "5px 5px", borderRadius: "20px" },
            }}
            style={{ width: "50%" }}
          />
        </Stack>
      </Grid>
      <Grid item flex={3}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "10px",
            width: "50%",
            justifyContent: "center",
            display: "flex",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              paddingLeft: 4,
              paddingRight: 3,
              paddingY: 2,
              borderRadius: "10px 10px 0 0 ",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <ReceivingPatientsItem />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ReceivingPatients;
