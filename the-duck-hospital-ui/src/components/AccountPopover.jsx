import {
  Avatar,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import styled from "@emotion/styled";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  alignItems: "center",
  ":hover": {
    color: "#0974f1",
    backgroundColor: "#ddf6fe8d",
  },
}));
const CustomMenuItemLogOut = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  alignItems: "center",
  ":hover": {
    backgroundColor: "#ddf6fe8d",
  },
}));
function AccountPopover(props) {
  const { anchorEl, onClose, open } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
      open={open}
    >
      <Stack
        spacing={1}
        direction={"column"}
        sx={{
          width: "235px",
          px: "8px",
          paddingY: "16px",
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
              Nguyễn Ngọc Tuyết Vi
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <MenuList
          disablePadding
          dense
          sx={{
            "& > *": {
              borderRadius: 1,
            },
          }}
        >
          <CustomMenuItem>
            <InfoOutlinedIcon
              fontSize="small"
              sx={{
                marginRight: "8px",
              }}
            />
            Hồ sơ bệnh nhân
          </CustomMenuItem>
          <CustomMenuItem>
            <NoteAddOutlinedIcon
              fontSize="small"
              sx={{
                marginRight: "8px",
              }}
            />
            Phiếu khám bệnh
          </CustomMenuItem>

          <CustomMenuItemLogOut
            sx={{
              color: "red",
            }}
            onClick={(e) => {}}
          >
            <LogoutOutlinedIcon
              fontSize="small"
              sx={{
                marginRight: "8px",
              }}
            />
            Đăng xuất
          </CustomMenuItemLogOut>
        </MenuList>
      </Stack>
    </Popover>
  );
}

AccountPopover.propTypes = {
  // Định nghĩa propTypes cho component SignOut
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default AccountPopover;
