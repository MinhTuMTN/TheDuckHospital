import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Badge,
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { usePopover } from "../../../hooks/use-popover";
import { checkInfo } from "../../../services/customer/AuthServices";
import AccountPopover from "../../General/Navbar/AccountPopover";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
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
function TopNavBarInpatient(props) {
  const { onDrawerClick } = props;
  const accountPopover = usePopover();
  const { setFullName, fullName, setNurseType } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  useEffect(() => {
    const handleGetFullName = async () => {
      const response = await checkInfo();
      if (response.success) {
        setFullName(response.data.data.fullName);
        setNurseType(response.data.data.nurseType);
      }
    };
    handleGetFullName();
  }, [setFullName, setNurseType]);
  return (
    <Box
      component={"header"}
      sx={{
        backdropFilter: "blur(8px)",
        boxShadow: "0 1px 4px 0 rgb(0 0 0 / 15%)",
        borderColor: "hsl(215 15% 92%)",
        borderWidth: "none",
        borderBottomWidth: "thin",
        backgroundColor: "#fff",
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT, // Đặt chiều cao tối thiểu cho phần header
          px: 2, // Đặt padding theo chiều ngang cho phần header
        }}
      >
        {!lgUp && (
          <IconButton onClick={() => onDrawerClick(true)}>
            {" "}
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        )}
        <Stack direction={"row"} alignItems={"center"} spacing={1} flex={1}>
          <CardMedia
            component={"img"}
            image={
              "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702293009/hospital-building_ue3udt.png"
            }
            sx={{
              height: "30px",
              width: "30px",
            }}
          />
          <Typography
            sx={{
              textAlign: "left",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#466f92",
              fontSize: "14px",
            }}
          >
            Quản lý phòng nội trú
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton
            style={{
              backgroundColor: "#f5f5f5",
            }}
          >
            <SvgIcon fontSize="small">
              <NotificationsNoneIcon />
            </SvgIcon>
          </IconButton>
          <CustomButton
            component={Button}
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
          >
            <span style={{ position: "relative" }}>
              <CardMedia
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyyiip4CAXLbtJL5s2tQ4PdZgvr6NZJJ55rDT3kfPU-hNjoQMm_XqMVqlozf4XhyGMY_o&usqp=CAU"
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
                  Điều dưỡng
                </Typography>
                <ExpandMoreIcon
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
        <AccountPopover
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
          width={"225px"}
        />
      </Stack>
    </Box>
  );
}

export default TopNavBarInpatient;
