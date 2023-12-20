import { Avatar, Divider, Popover, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useAuth } from "../../auth/AuthProvider";
import AdminMenuList from "../General/Navbar/AdminMenuList";

function AdminPopover(props) {
  const { anchorEl, onClose, open } = props;
  const { setToken, fullName } = useAuth();

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
              {fullName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
          <AdminMenuList onClose={onClose} setToken={setToken} />
      </Stack>
    </Popover>
  );
}

AdminPopover.propTypes = {
  // Định nghĩa propTypes cho component SignOut
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default AdminPopover;
