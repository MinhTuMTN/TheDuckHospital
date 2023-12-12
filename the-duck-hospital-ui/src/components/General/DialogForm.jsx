import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

DialogForm.propTypes = {
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

const CustomAddButton = styled(Button)(({ theme }) => ({
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    background: theme.palette.normal2.main,
    color: "white"
  },
}));

const CustomCancelButton = styled(Button)(({ theme }) => ({
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  height: "42px",
  "&:hover": {
    background: theme.palette.delete.main,
    color: "white"
  },
}));

function DialogForm(props) {
  const [open, setOpen] = React.useState(props.open);
  useEffect(() => {
    setOpen(props.open); // Synchronize the open state with the prop
  }, [props.open]);

  const handleOk = () => {
    props.onOk();
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
      maxWidth="md"
    >
      <DialogTitle>
        <span style={{ fontSize: "1.5rem" }}>{props.title}</span>
      </DialogTitle>
      <DialogContent>{props.children || props.content}</DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        {props.cancelText && (
          <CustomCancelButton onClick={handleCancel} variant="outlined" color="delete">
            {props.cancelText}
          </CustomCancelButton>
        )}
        {props.okText && (
          <CustomAddButton onClick={handleOk} variant="outlined" color="normal2">
            {props.okText}
          </CustomAddButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
