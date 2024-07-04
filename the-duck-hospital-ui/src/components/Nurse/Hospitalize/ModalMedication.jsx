import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
};
const HeaderModal = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eaeaea",
  padding: "6px 16px",
}));
const BodyModal = styled(Stack)(({ theme }) => ({
  padding: "16px 16px 8px 16px",
}));

const FooterModal = styled(Stack)(({ theme }) => ({
  padding: "16px ",
  borderTop: "1px solid #eaeaea",
  justifyContent: "flex-end",
}));
const ModalMedication = (props) => {
  const {
    openModal,
    onClose,
    modalTitle,
    iconTitle,
    buttonAPIName,
    secondButtonAPIName,
    onButtonAPIClick,
    onSecondButtonAPIClick,
  } = props;
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <HeaderModal direction={"row"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {iconTitle}
            <Typography variant="h6">{modalTitle}</Typography>
          </Stack>
          <IconButton
            style={{
              marginRight: "-6px",
            }}
            onClick={onClose}
          >
            <Close color="disabled" />
          </IconButton>
        </HeaderModal>
        <BodyModal direction={"column"}>{props.children}</BodyModal>
        <FooterModal direction={"row"} spacing={1}>
          {secondButtonAPIName !== "" ? (
            <Button
              variant="text"
              color="error"
              style={{
                textTransform: "none",
              }}
              onClick={onSecondButtonAPIClick}
            >
              {secondButtonAPIName}
            </Button>
          ) : (
            <Button
              variant="text"
              color="error"
              style={{
                textTransform: "none",
              }}
              onClick={onClose}
            >
              Hủy
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
            }}
            onClick={onButtonAPIClick}
          >
            {buttonAPIName}
          </Button>
        </FooterModal>
      </Box>
    </Modal>
  );
};

ModalMedication.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  modalTitle: PropTypes.string,
  iconTitle: PropTypes.element,
  buttonAPIName: PropTypes.string,
  secondButtonAPIName: PropTypes.string,
};

export default ModalMedication;
