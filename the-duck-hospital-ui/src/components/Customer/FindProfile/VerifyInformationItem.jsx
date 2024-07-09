import { Box, Stack } from "@mui/material";
import React from "react";
import RowInfo from "../RowInfo";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import dayjs from "dayjs";

function VerifyInformationItem(props) {
  const { profile } = props;
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
          value={profile.fullName}
          icon={<PersonIcon />}
        />
        <RowInfo
          title={"Ngày sinh:"}
          value={dayjs(profile.dateOfBirth).format("DD/MM/YYYY")}
          icon={<CakeIcon />}
        />
        <RowInfo
          title={"Địa chỉ:"}
          value={`${profile.streetName}, ${profile?.ward?.wardName}, ${profile?.district?.districtName}, ${profile?.province?.provinceName}`}
          icon={<PlaceIcon />}
          alignItems={"flex-start"}
        />
        <RowInfo
          title={"Số điện thoại:"}
          value={profile.phoneNumber}
          icon={<PhoneIcon />}
        />
      </Stack>
    </Box>
  );
}

export default VerifyInformationItem;
