import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MedicalBillProfileItem from "../../components/Customer/MedicalBill/MedicalBillProfileItem";
import { getBookings } from "../../services/customer/BookingServices";
import { enqueueSnackbar } from "notistack";

function MedicalBillsPage(props) {
  const [bookings, setBookings] = React.useState([]);
  useEffect(() => {
    const handleGetBookings = async () => {
      const response = await getBookings();
      if (response.success) setBookings(response.data.data);
      else
        enqueueSnackbar("Lỗi lấy dữ liệu phiếu khám bệnh", {
          variant: "error",
        });
    };
    handleGetBookings();
  }, []);
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
        Phiếu khám bệnh
      </Typography>

      <Box mt={2}>
        {bookings.map((booking, index) => (
          <MedicalBillProfileItem
            key={`medical-bill-${index}`}
            booking={booking}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MedicalBillsPage;
