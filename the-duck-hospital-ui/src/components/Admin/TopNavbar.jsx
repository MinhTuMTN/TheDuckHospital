import { HomeWork } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { usePopover } from "../../hooks/use-popover";
import AdminPopover from "./AdminPopover";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNavbar(props) {
  const { onDrawerClick } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg")); // Sử dụng useMediaQuery để lấy ra giá trị của màn hình hiện tại
  const accountPopover = usePopover(); // Sử dụng usePopover để lấy ra giá trị của popover
  const name = "Bệnh viện The Duck Hospital";

  return (
    <>
      <Box
        component={"header"}
        sx={{
          backdropFilter: "blur(6px)", // Sử dụng filter cho phần header để làm mờ nền phía sau
          backgroundColor: "#fff", // Màu nền của header
          position: "sticky", // Cho phần header luôn luôn ở trên cùng
          left: {
            lg: `${SIDE_NAV_WIDTH}px`, // Khi màn hình lớn hơn hoặc bằng lg thì left của header sẽ bằng với width của side nav
          },
          top: 0, // Cho phần header luôn luôn ở trên cùng
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`, // Khi màn hình lớn hơn hoặc bằng lg thì width của header sẽ bằng 100% - width của side nav
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT, // Đặt chiều cao tối thiểu cho phần header
            px: 2, // Đặt padding theo chiều ngang cho phần header
          }}
        >
          <Stack direction={"row"} spacing={2}>
            {!lgUp && (
              <IconButton onClick={() => onDrawerClick(true)}>
                {" "}
                <SvgIcon fontSize="small">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack direction={"row"} spacing={0} alignItems={"center"}>
            <Typography
              variant={"body1"}
              border={"400"}
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {name}
            </Typography>
            <Tooltip title={"The Duck Hospital"}>
              <IconButton
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
              >
                <SvgIcon
                  fontSize="large"
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #0d0d0d",
                  }}
                >
                  <HomeWork />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      <AdminPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
}
TopNavbar.propTypes = {
  onNavOpen: PropTypes.func,
};

export default TopNavbar;
