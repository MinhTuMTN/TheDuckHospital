import { Stack, Typography } from "@mui/material";
import React from "react";

function InvoiceNotFound() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <img
        alt="InvoiceNotFound"
        width={"350px"}
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1717659523/9318694-removebg-preview_hla3mf.png"
      />
      <Typography
        variant="h4"
        color="text"
        align="center"
        fontSize={"22px"}
        fontWeight={400}
      >
        Không tìm thấy hoá đơn nào phù hợp
      </Typography>
    </Stack>
  );
}

export default InvoiceNotFound;
