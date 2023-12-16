import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
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
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import LoadingCute from "../../components/General/LoadingCute";
import AddNewProfile from "../../components/Nurse/AddNewProfile";
import SearchNotFound from "../../components/Nurse/SearchNotFound";
import { searchPatientProfiles } from "../../services/nurse/PatientProfileServices";
import InfoItem from "./InfoItem";

const StyledInputNumber = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

function ReceivingPatientsCounter(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [search, setSearch] = useState({ name: "", identityNumber: "" });
  const [patientProfiles, setPatientProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (search.name.trim() === "") {
      enqueueSnackbar("Vui lòng nhập họ và tên", {
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    const response = await searchPatientProfiles(search);
    if (response.success) {
      setPatientProfiles(response.data.data);
    } else
      enqueueSnackbar("Đã xảy ra lỗi khi tìm kiếm", {
        variant: "error",
      });
    setIsLoading(false);
  };
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
          autoFocus
          autoComplete="off"
          sx={{
            width: "100%",
            flex: isFullScreen ? 3 : 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
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
        <StyledInputNumber
          size="medium"
          variant="outlined"
          placeholder="Nhập CCCD/Số điện thoại"
          autoComplete="off"
          type="number"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            flex: isFullScreen ? 2 : 1,
          }}
          value={search.identityNumber}
          onChange={(e) =>
            setSearch({ ...search, identityNumber: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
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
                CCCD/ Số điện thoại
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
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Stack>
      <Grid
        container
        spacing={3}
        sx={{ mt: 3, justifyContent: "space-between" }}
      >
        {isLoading && <LoadingCute />}
        {!isLoading &&
          patientProfiles.map((patientProfile) => (
            <Grid item xs={12} md={6} key={patientProfile.patientProfileId}>
              <InfoItem patientProfile={patientProfile} />
            </Grid>
          ))}

        {!isLoading && patientProfiles.length === 0 && <SearchNotFound />}
      </Grid>
    </Stack>
  );
}

export default ReceivingPatientsCounter;
