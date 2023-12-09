import {
  CakeOutlined,
  DeleteOutline,
  EditOutlined,
  InfoOutlined,
  LocationOnOutlined,
  PeopleOutline,
  Person2Outlined,
  PhoneOutlined,
  WcOutlined,
} from "@mui/icons-material";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PatientRecordDetailsDialog from "./PatientRecordDetailsDialog";
import DialogConfirm from "../../General/DialogConfirm";
import FormatDate from "../../General/FormatDate";
import { deletePatientProfile } from "../../../services/customer/PatientProfileServices";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function PatientRecordItem(props) {
  const { profile, reload } = props;
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    const response = await deletePatientProfile(profile.patientProfileId);
    if (response.success) {
      enqueueSnackbar("Xoá hồ sơ bệnh nhân thành công", {
        variant: "success",
      });
      reload();
    } else
      enqueueSnackbar("Xoá hồ sơ bệnh nhân thất bại", {
        variant: "error",
      });
  };
  return (
    <Box
      component={Paper}
      p={{
        xs: 1,
        sm: 2,
      }}
      width={"100% !important"}
      marginBottom={"5px"}
      overflow={{
        xs: "hidden",
        sm: "auto",
      }}
      elevation={2}
      borderRadius={3}
    >
      <Grid width={"100%"} container spacing={1.5}>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <Person2Outlined sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Họ và tên
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography
            variant="body"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#2788CE",
              textTransform: "uppercase",
            }}
          >
            {profile.fullName}
          </Typography>
        </Grid>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <CakeOutlined sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Ngày sinh
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography variant="body" fontSize={14} fontWeight={500}>
            <FormatDate dateTime={profile.dateOfBirth} />
          </Typography>
        </Grid>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <PhoneOutlined sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Số điện thoại
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography variant="body" fontSize={14} fontWeight={500}>
            {profile.phoneNumber}
          </Typography>
        </Grid>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <WcOutlined sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Giới tính
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography variant="body" fontSize={14} fontWeight={500}>
            {profile.gender === "MALE" ? "Nam" : "Nữ"}
          </Typography>
        </Grid>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <LocationOnOutlined sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Địa chỉ
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography variant="body" fontSize={14} fontWeight={500}>
            {`${profile.streetName}, ${profile.ward?.wardName}, ${profile.district?.districtName}, ${profile.province?.provinceName}`}
          </Typography>
        </Grid>
        <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
          <PeopleOutline sx={{ marginRight: 1 }} />
          <Typography variant="body" fontSize={14}>
            Dân tộc
          </Typography>
        </Grid>
        <Grid item sm={9.5} xs={7}>
          <Typography variant="body" fontSize={14} fontWeight={500}>
            {profile.nation?.nationName}
          </Typography>
        </Grid>
      </Grid>

      <Box
        marginX={-2}
        mt={1}
        p={1}
        justifyContent={{
          xs: "center",
          sm: "flex-end",
        }}
        component={Stack}
        spacing={{
          xs: 1,
          sm: 2,
        }}
        direction={"row"}
      >
        <Button
          sx={{
            fontWeight: 1000,
            fontSize: {
              xs: 10,
              sm: 12.9,
            },
          }}
          startIcon={<DeleteOutline />}
          color={"delete"}
          onClick={() => setOpenDeleteDialog(true)}
        >
          Xóa hồ sơ
        </Button>
        <Button
          color="normal2"
          startIcon={<EditOutlined />}
          sx={{
            fontWeight: 1000,
            fontSize: {
              xs: 10,
              sm: 12.9,
            },
          }}
          onClick={() => {
            navigate("/edit-profile", { state: { profile } });
          }}
        >
          Chỉnh sửa
        </Button>
        <Button
          sx={{
            fontWeight: 1000,
            fontSize: {
              xs: 10,
              sm: 12.9,
            },
          }}
          startIcon={<InfoOutlined />}
          color={"black"}
          onClick={() => setOpen(true)}
        >
          Chi tiết
        </Button>
      </Box>

      <PatientRecordDetailsDialog
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
      />
      <DialogConfirm
        cancelText={"Hủy"}
        okText={"Xoá"}
        title={"Xoá hồ sơ bệnh nhân"}
        content={"Bạn có chắc chắn muốn xoá hồ sơ bệnh nhân này?"}
        onCancel={() => setOpenDeleteDialog(false)}
        onClose={() => setOpenDeleteDialog(false)}
        onOk={() => handleDeleteProfile()}
        open={openDeleteDialog}
      />
    </Box>
  );
}

export default PatientRecordItem;
