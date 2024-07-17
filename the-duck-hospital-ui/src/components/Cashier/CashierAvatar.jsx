import { ExpandMore, HomeOutlined, LogoutOutlined } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CardMedia,
  Divider,
  Popover,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { memo } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { appColors } from "../../utils/appColorsUtils";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  margin: "10px 0 0 0",
  columnGap: "4px",
  alignItems: "center",
  cursor: "pointer",
});

const CustomButton = styled(Box)`
  padding: 4px 18px !important;
  direction: ltr;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  border-radius: 0;
  &:hover {
    outline: none;
    cursor: pointer;
  }
`;

const PopoverItem = memo(({ children, color, icon, onClick }) => {
  const Icon = icon;
  return (
    <StyledBox display={"flex"} onClick={onClick} paddingX={1}>
      <Icon
        sx={{
          fontSize: "20px",
          color: color,
        }}
      />
      <Typography
        variant="body1"
        color={color}
        fontWeight={500}
        fontSize={"15px"}
      >
        {children}
      </Typography>
    </StyledBox>
  );
});

function CashierAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { fullName, setToken, avatar } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexBasis: "15%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <CustomButton component={Button} onClick={handleClick} ref={anchorEl}>
          <span style={{ position: "relative" }}>
            <CardMedia
              component="img"
              src={
                avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyyiip4CAXLbtJL5s2tQ4PdZgvr6NZJJ55rDT3kfPU-hNjoQMm_XqMVqlozf4XhyGMY_o&usqp=CAU"
              }
              sx={{
                width: "40px",
                height: "40px",
                marginRight: 1,
                borderRadius: "50%",
                padding: "1px",
                border: "1px solid #1d7ed8",
                boxShadow: "0px 0px 1px 0px #41adff",
              }}
            />
            <Badge
              badgeContent=" "
              variant="dot"
              style={{
                backgroundColor: "#0bb240",
                borderRadius: "50%",
                height: "12px",
                width: "12px",
                position: "absolute",
                top: "30px",
                right: "10px",
                border: "2px solid #ffffff",
              }}
            />
          </span>

          <Stack direction={"column"} alignItems={"flex-start"}>
            <Typography
              variant={"body1"}
              style={{
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {fullName}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Typography
                variant={"body2"}
                style={{
                  textTransform: "none",
                  fontSize: "10px",
                  color: "#8c8c8c",
                }}
              >
                Thu ngân
              </Typography>
              <ExpandMore
                sx={{
                  fontSize: "14px",
                  color: "#8c8c8c",
                  marginTop: "-2px",
                }}
              />
            </Stack>
          </Stack>
        </CustomButton>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          spacing={1}
          direction={"column"}
          sx={{
            px: "8px",
            paddingY: "16px",
            width: "235px",
          }}
        >
          <Stack direction={"row"} spacing={1.7} paddingX={1}>
            <Avatar />
            <Stack direction={"column"}>
              <Typography
                variant="h6"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Xin chào,
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {fullName}
              </Typography>
            </Stack>
          </Stack>

          <Divider />
          <PopoverItem
            color={appColors.primary}
            icon={HomeOutlined}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </PopoverItem>
          <PopoverItem
            color={appColors.error}
            icon={LogoutOutlined}
            onClick={() => {
              setToken(null);
              handleClose();
              navigate("/");
            }}
          >
            Đăng xuất
          </PopoverItem>
        </Stack>
      </Popover>
    </Box>
  );
}

export default CashierAvatar;
