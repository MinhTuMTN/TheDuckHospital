import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
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

function DialogForm(props) {
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
      maxWidth="md"
    >
      <DialogTitle>
        <span style={{ fontSize: "1.5rem" }}>{props.title}</span>
      </DialogTitle>
      <DialogContent>{props.children || props.content}</DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        {props.cancelText && (
          <Button onClick={handleCancel} variant="outlined">
            {props.cancelText}
          </Button>
        )}
        {props.okText && (
          <Button onClick={handleOk} variant="outlined">
            {props.okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
