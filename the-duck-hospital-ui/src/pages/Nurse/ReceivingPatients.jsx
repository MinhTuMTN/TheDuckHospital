import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import SearchNotFound from "../../components/Nurse/SearchNotFound";
import ReceivingPatientsItem from "./ReceivingPatientsItem";
import { NurseContext } from "../../auth/NurseProvider";
import { searchBooking } from "../../services/nurse/BookingServices";
import { enqueueSnackbar } from "notistack";

const SearchTextField = styled(TextField)(({ theme }) => ({}));

function ReceivingPatients(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [searchString, setSearchString] = React.useState("");
  const [booking, setBooking] = React.useState(null);
  const { roomId } = useContext(NurseContext);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    const handleSearchBooking = async () => {
      if (searchString.trim().length !== 12) {
        setBooking(null);
        return;
      }

      setIsLoading(true);
      const response = await searchBooking(searchString, roomId);
      if (response.success) {
        setBooking(response.data.data);
      } else {
        setBooking(null);
        let message = "Đã có lỗi xảy ra";
        if (response.statusCode === 404) {
          message = "Không tìm thấy thông tin đặt trước";
        } else if (response.statusCode === 410) {
          message = "Phòng khám không hợp lệ";
        } else if (response.statusCode === 409) {
          message = "Ngày đặt khám không hợp lệ";
        }
        enqueueSnackbar(message, { variant: "error" });
      }
      setIsLoading(false);
    };
    handleSearchBooking();
  }, [searchString, roomId]);

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
            autoComplete="off"
            autoFocus
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
        {!isLoading && !booking ? (
          <Stack>
            <SearchNotFound />
          </Stack>
        ) : (
          booking &&
          !isLoading && (
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
                <ReceivingPatientsItem
                  booking={booking}
                  onReload={() => {
                    setSearchString("");
                  }}
                />
              </Box>
            </Stack>
          )
        )}
        {isLoading && (
          <Box width={"100%"} height={"100%"} display={"flex"}>
            <CardMedia
              src="https://i.redd.it/3oibd39gysz21.gif"
              component="img"
              sx={{
                width: "50%",
                height: "50%",
                objectFit: "contain",
                margin: "auto",
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default ReceivingPatients;
