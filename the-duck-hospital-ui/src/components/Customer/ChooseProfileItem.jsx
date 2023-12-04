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
import dayjs from "dayjs";
import DialogConfirm from "../DialogConfirm";
import { enqueueSnackbar } from "notistack";
import { deletePatientProfile } from "../../services/customer/PatientProfileServices";

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
  const { profile } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteProfile = async () => {
    const response = await deletePatientProfile(profile.patientProfileId);
    if (response.success) {
      enqueueSnackbar("Xoá hồ sơ bệnh nhân thành công", {
        variant: "success",
      });
      props.onReload();
      setOpenDeleteDialog(false);
    } else {
      enqueueSnackbar("Xoá hồ sơ bệnh nhân thất bại", {
        variant: "error",
      });
    }
  };
  return (
    <>
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
              value={profile.fullName}
              icon={<PersonIcon />}
            />
            <RowInfo
              title={"Ngày sinh:"}
              value={dayjs(profile.dateOfBirth).format("DD/MM/YYYY")}
              icon={<CakeIcon />}
            />
            <RowInfo
              title={"Số điện thoại:"}
              value={profile.phoneNumber}
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
            <RowInfo
              title={"Giới tính:"}
              value={profile.gender === "MALE" ? "Nam" : "Nữ"}
              icon={<WcIcon />}
            />
            <RowInfo
              title={"Dân tộc:"}
              value={profile.nation.nationName}
              icon={<GroupsIcon />}
            />
            <RowInfo
              title={"Địa chỉ:"}
              value={`${profile.streetName}, ${profile.ward?.wardName}, ${profile.district?.districtName}, ${profile.province?.provinceName}`}
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
                    onClick={() => setOpenDeleteDialog(true)}
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

      <DialogConfirm
        cancelText={"Hủy"}
        okText={"Xoá"}
        title={"Xoá hồ sơ bệnh nhân"}
        content={"Bạn có chắc chắn muốn xoá hồ sơ bệnh nhân này?"}
        onCancel={() => setOpenDeleteDialog(false)}
        onClose={() => setOpenDeleteDialog(false)}
        onOk={handleDeleteProfile}
        open={openDeleteDialog}
      />
    </>
  );
}

export default ChooseProfileItem;
