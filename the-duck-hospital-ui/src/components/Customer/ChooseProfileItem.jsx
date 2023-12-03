import styled from "@emotion/styled";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CakeIcon from "@mui/icons-material/Cake";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import WcIcon from "@mui/icons-material/Wc";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import RowInfo from "./RowInfo";
const data = {
  id: 1,
  name: "Nguyễn Ngọc Tuyết Vi",
  bithday: "01/01/2000",
  phone: "0123456789",
  gender: "Nữ",
  address: "210 Lê Văn Thịnh, phường Cát Lái, quận 2, TP.HCM",
  ethnicity: "Kinh",
};

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "& Mui-expanded MuiAccordionSummary-contentGutters": {
    margin: "20px 0 0 0",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function ChooseProfileItem(props) {
  return (
    <Accordion
      className="accordion-hello"
      sx={{
        width: "100%",
        borderRadius: "15px",
        transition: "border 0.3s, filter 0.3s",
        "&:hover": {
          border: "2px solid #42a5f5",
        },
      }}
    >
      <StyledAccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          width: "100%",
        }}
      >
        <Stack direction={"column"} spacing={0.5}>
          <RowInfo
            title={"Họ và tên:"}
            value={data.name}
            icon={<PersonIcon />}
          />
          <RowInfo
            title={"Ngày sinh:"}
            value={data.bithday}
            icon={<CakeIcon />}
          />
          <RowInfo
            title={"Số điện thoại:"}
            value={data.phone}
            icon={<PhoneIcon />}
          />
        </Stack>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{
          width: "100%",
        }}
      >
        <Stack direction={"column"} spacing={0.5}>
          <RowInfo title={"Giới tính:"} value={data.gender} icon={<WcIcon />} />
          <RowInfo
            title={"Dân tộc:"}
            value={data.ethnicity}
            icon={<GroupsIcon />}
          />
          <RowInfo
            title={"Địa chỉ:"}
            value={data.address}
            icon={<PlaceIcon />}
          />
          <Box
            sx={{
              width: "100%",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{
                margin: "20px 0 0 0",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <CustomButton
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(253, 57, 122, 0.229)",
                    color: "#fd397a",
                    marginRight: "20px",
                    "&:hover": {
                      backgroundColor: "rgba(253, 57, 122, 0.229)",
                    },
                  }}
                >
                  <DeleteIcon />
                  Xoá
                </CustomButton>
                <CustomButton
                  variant="contained"
                  sx={{
                    backgroundColor: "	#dbf1fb",
                    color: "	#3fb8f1",
                    "&:hover": {
                      backgroundColor: "	#dbf1fb",
                    },
                  }}
                >
                  <EditIcon />
                  Chỉnh sửa
                </CustomButton>
              </Box>

              <CustomButton
                variant="contained"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #42a5f5, #6fccea)",
                  color: "#fff", // Màu chữ
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #42a5f5, #6fccea)",
                  },
                }}
              >
                Tiếp tục
                <ArrowRightAltIcon />
              </CustomButton>
            </Stack>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default ChooseProfileItem;
