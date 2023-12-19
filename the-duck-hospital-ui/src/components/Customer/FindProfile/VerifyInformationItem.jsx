import { Box, Stack } from "@mui/material";
import React from "react";
import RowInfo from "../RowInfo";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import dayjs from "dayjs";
function VerifyInformationItem(props) {
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "8px",
        borderLeft: "8px solid #42a5f5",
        borderTop: "1px solid #42a5f5",
        borderBottom: "1px solid #42a5f5",
        borderRight: "1px solid #42a5f5",
        transition: "border 0.3s, filter 0.3s",
        maxWidth: "sm",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Stack direction={"column"} spacing={0.5} width={"100%"}>
        <RowInfo
          title={"Họ và tên:"}
          value={"Nguyễn Văn A"}
          icon={<PersonIcon />}
        />
        <RowInfo
          title={"Ngày sinh:"}
          value={dayjs("20/10/2002").format("DD/MM/YYYY")}
          icon={<CakeIcon />}
        />
        <RowInfo
          title={"Địa chỉ:"}
          value={"1 Võ Văn Ngân, phường Linh Chiểu, quận Thủ Đức, TP.HCM"}
          icon={<PlaceIcon />}
        />
        <RowInfo
          title={"Số điện thoại:"}
          value={"0123456789"}
          icon={<PhoneIcon />}
        />
      </Stack>
    </Box>
  );
}

export default VerifyInformationItem;
