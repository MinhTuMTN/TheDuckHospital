import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

DialogConfirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 30px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function DialogConfirm(props) {
  const [open, setOpen] = React.useState(props.open);
  useEffect(() => {
    setOpen(props.open); // Synchronize the open state with the prop
  }, [props.open]);

  const handleOk = () => {
    props.onOk();
    props.onClose();
  };

  const handleCancel = () => {
    props.onCancel();
    props.onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      aria-describedby="alert-dialog-slide-description"
      style={{ zIndex: 1000000 }}
    >
      <DialogTitle>
        <span style={{ fontSize: "1.5rem" }}>{props.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={"template.darker"}>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        {props.cancelText && (
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
            onClick={handleCancel}
          >
            {props.cancelText}
          </CustomButton>
        )}
        {props.okText && (
          <CustomButton
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
              color: "#fff", // Màu chữ
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #42a5f5, #6fccea)",
              },
            }}
            onClick={handleOk}
          >
            {props.okText}
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirm;
