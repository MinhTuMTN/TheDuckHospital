import {
  CakeOutlined,
  CloseOutlined,
  EmailOutlined,
  FingerprintOutlined,
  LocationOnOutlined,
  PeopleOutline,
  Person2Outlined,
  PhoneOutlined,
  QrCodeOutlined,
  WcOutlined,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={2000} ref={ref} {...props} />;
});

function PatientRecordDetailsDialog(props) {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontSize={22} color={"template.normal1"}>
              Hồ sơ bệnh nhân
            </Typography>
            <IconButton onClick={onClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Grid
            container
            spacing={1.5}
            mt={{
              xs: 0.5,
              md: 1,
            }}
          >
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
                Nguyễn Văn A
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
                01/01/2000
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
                0987654321
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
                Nam
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
                1 Võ Văn Ngân, phường Linh Chiểu, Thành phố Thủ Đức, TP. Hồ Chí
                Minh
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
                Kinh
              </Typography>
            </Grid>
            <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
              <FingerprintOutlined sx={{ marginRight: 1 }} />
              <Typography variant="body" fontSize={14}>
                CCCD
              </Typography>
            </Grid>
            <Grid item sm={9.5} xs={7}>
              <Typography variant="body" fontSize={14} fontWeight={500}>
                082201234756
              </Typography>
            </Grid>
            <Grid item sm={2.5} xs={5} component={Stack} alignItems={"center"}>
              <QrCodeOutlined sx={{ marginRight: 1 }} />
              <Typography variant="body" fontSize={14}>
                Mã bệnh nhân
              </Typography>
            </Grid>
            <Grid item sm={9.5} xs={7}>
              <Typography variant="body" fontSize={14} fontWeight={500}>
                ABCD-1234
              </Typography>
            </Grid>

            <Grid item xs={12} md={2.5} component={Stack} alignItems={"center"}>
              <EmailOutlined sx={{ marginRight: 1 }} />
              <Typography variant="body" fontSize={14}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} md={9.5}>
              <Typography variant="body" fontSize={14} fontWeight={500}>
                nguyenminhtu2002@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default PatientRecordDetailsDialog;
