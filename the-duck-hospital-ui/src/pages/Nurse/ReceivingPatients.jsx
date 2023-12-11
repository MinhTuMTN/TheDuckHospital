import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Search } from "@mui/icons-material";
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
        height: "100vh",
      }}
    >
      <Grid item xs={12}>
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
      <Grid item xs={12} md={6}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              paddingX: 4,
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
