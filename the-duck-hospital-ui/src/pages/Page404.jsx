import styled from "@emotion/styled";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Icon404 from "../assets/icon_404.jpg";
import Page from "../components/Page";

const RootPage404 = styled(Page)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
  },

  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  boxSizing: "border-box",
  padding: theme.spacing(2, 2),
}));

// Responsive Avatar MUI
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(40),
  height: theme.spacing(40),
  margin: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  },

  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2),
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function Page404(props) {
  return (
    <RootPage404 title="404 Page">
      <Box
        sx={{
          maxWidth: 480,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="teal.main">
          Trang không tồn tại
        </Typography>
        <Typography>
          Xin lỗi, chúng tôi không tìm thấy trang bạn yêu cầu. Bạn có thể quay
          trở lại trang chủ hoặc kiểm tra lại đường dẫn.
        </Typography>

        <CustomAvatar src={Icon404} alt="404" />

        <CustomButton
          to="/"
          size="large"
          variant="contained"
          color="teal"
          component={Link}
        >
          <Typography color="white">
            <b>QUAY LẠI TRANG CHỦ</b>
          </Typography>
        </CustomButton>
      </Box>
    </RootPage404>
  );
}

export default Page404;
