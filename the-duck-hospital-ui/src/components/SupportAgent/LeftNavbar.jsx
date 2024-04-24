import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  CardMedia,
  Drawer,
  Stack,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import ActiveConversationList from "./ActiveConversationList";
import WaitingConversationList from "./WaitingConversationList";

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "220px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  paddingX: "16px",
}));
const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));
const StyledTab = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  cursor: "pointer",
  flex: 1,
  ":hover": {
    backgroundColor: "#f7f7f7",
  },
}));

function LeftNavbar(props) {
  const { open, onOpenClose } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { fullName, setToken } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textAlign: "center",
      }}
    >
      <StyledContainer>
        <Box
          sx={{
            paddingY: 2,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <StyledLogo image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png" />
        </Box>
        <Stack direction={"row"}>
          <StyledTab
            onClick={() => {
              setTabValue(0);
            }}
          >
            <Typography
              textAlign={"center"}
              color={tabValue === 0 ? "#0184c6" : "#000000"}
            >
              Đang hoạt động
            </Typography>
          </StyledTab>
          <StyledTab
            onClick={() => {
              setTabValue(1);
            }}
          >
            <Typography
              textAlign={"center"}
              color={tabValue === 1 ? "#0184c6" : "#000000"}
            >
              Đang chờ
            </Typography>
          </StyledTab>
        </Stack>
        {tabValue === 0 ? (
          <ActiveConversationList />
        ) : (
          <WaitingConversationList />
        )}
      </StyledContainer>

      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          borderTop: "1px solid #e0e0e0",
          paddingX: 2,
          paddingY: 2.5,
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702286975/kitty_qrtjrw.png"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              padding: "5px",
              border: "1px solid #c8c8c8",
              boxShadow: "0px 0px 5px 0px #c8c8c8",
            }}
          />
          <Stack
            direction={"column"}
            spacing={0}
            sx={{
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#8c8c8c",
                textAlign: "left",
              }}
            >
              Hỗ trợ viên
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: theme.palette.text.main,
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              {fullName}
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#ff0d00d9",
            fontSize: "14px",
            textTransform: "none",
            justifyContent: "center",
            width: "100%",
            ":hover": {
              backgroundColor: "error.main",
            },
          }}
          onClick={() => {
            setToken(null);
            window.location.href = "/";
          }}
        >
          <Typography
            sx={{
              marginRight: "10px",
            }}
          >
            Đăng xuất
          </Typography>
          <LogoutIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </Button>
      </Stack>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",

            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={() => onOpenClose(false)}
      onOpen={() => onOpenClose(true)}
      open={open}
      PaperProps={{
        sx: {
          background: "#fff",
          color: "theme.palette.primary.main",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </SwipeableDrawer>
  );
}
LeftNavbar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
export default LeftNavbar;
