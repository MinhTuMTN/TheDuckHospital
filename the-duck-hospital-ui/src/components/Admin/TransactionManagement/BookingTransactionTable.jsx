import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BookingTransactionItem from "./BookingTransactionItem";


const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

function BookingTransactionTable(props) {
  const { bookings } = props;
  const [expanded, setExpanded] = useState("panel-");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            marginTop: 4,
            borderRadius: "15px",
          }}
          spacing={"2px"}
        >
          <Stack
            sx={{
              borderRadius: "15px",
              paddingTop: 1,
            }}
          >
            <BoxStyle>
              <Stack direction={"row"}>
                <TieuDe>Danh sách đặt khám</TieuDe>
              </Stack>
            </BoxStyle>
            <Box padding={2} sx={{ width: "100%" }}>
              {bookings?.map((item, index) => (
                <BookingTransactionItem
                  item={item}
                  key={index}
                  panel={"panel-" + index}
                  expanded={expanded}
                  handleChange={handleChange} />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BookingTransactionTable;
