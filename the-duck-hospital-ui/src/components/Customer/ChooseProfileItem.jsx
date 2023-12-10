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
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePatientProfile } from "../../services/customer/PatientProfileServices";
import DialogConfirm from "../General/DialogConfirm";
import RowInfo from "./RowInfo";

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "& .MuiAccordionSummary-contentGutters.Mui-expanded": {
    margin: "20px 0 0 0",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",

  // Extra small devices (portrait phones, less than 576px)
  "@media (max-width: 575.98px)": {
    padding: "8px 10px",
  },
}));

function ChooseProfileItem(props) {
  const { profile } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const navigate = useNavigate();

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
        sx={{
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
              title={"Số điện thoại:"}
              value={profile.phoneNumber}
              icon={<PhoneIcon />}
            />
          </Stack>
        </StyledAccordionSummary>
        <AccordionDetails
          sx={{
            maxWidth: "100%",
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
                  justifyContent: {
                    xs: "center",
                    md: "space-between",
                  },
                }}
              >
                <Box flex={{ xs: 3, md: 2 }} textAlign={"left"}>
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
                    onClick={() => {
                      navigate("/edit-profile", {
                        state: {
                          profile,
                        },
                      });
                    }}
                  >
                    <EditIcon />
                    Chỉnh sửa
                  </CustomButton>
                </Box>

                <CustomButton
                  flex={{ xs: 1, md: 1 }}
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
                  onClick={() => {
                    navigate("/choose-doctor", {
                      state: {
                        profile,
                      },
                    });
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
