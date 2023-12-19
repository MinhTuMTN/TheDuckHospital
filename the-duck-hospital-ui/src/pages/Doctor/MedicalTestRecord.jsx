import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DialogConfirm from "../../components/General/DialogConfirm";
import InfoTestPatient from "../../components/Doctor/InfoTestPatient";
import { getMedicalTestRecord, updateMedicalTestRecord } from "../../services/doctor/MedicalTestServices";

const handleBasicsInfo = (medicalTestecord) => {
  return [
    {
      label: "Ngày sinh:",
      value: dayjs(medicalTestecord?.patientDateOfBirth)?.format("DD/MM/YYYY"),
      icon: <CakeOutlinedIcon fontSize="18px" />,
    },

    {
      label: "Địa chỉ:",
      value: medicalTestecord?.patientAddress,
      icon: <LocationOnOutlinedIcon fontSize="18px" />,
    },
    {
      label: "Số điện thoại:",
      value: medicalTestecord?.patientPhoneNumber,
      icon: <LocalPhoneIcon fontSize="18px" />,
    },
  ];
};

function MedicalTestRecord(props) {
  const navigate = useNavigate();
  const { medicalTestId } = useParams();
  const [basicsInfo, setBasicsInfo] = React.useState([]);
  const [medicalTestRecord, setMedicalTestRecord] = React.useState({});
  const [openComplete, setOpenComplete] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const handleGetMedicalTestRecord = async () => {
      const response = await getMedicalTestRecord(medicalTestId);
      if (response.success) {
        setMedicalTestRecord(response.data.data);
        setBasicsInfo(handleBasicsInfo(response.data.data));
      }
    };
    handleGetMedicalTestRecord();
  }, [medicalTestId]);

  const handleUpdateMedicalTestRecord = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await updateMedicalTestRecord(medicalTestId, formData);
    if (response.success) {
      enqueueSnackbar("Cập nhật thành công", { variant: "success" });
      navigate("/doctor/doctor-test");
    }
  };

  return (
    <>
      <Box
        sx={{
          pt: 3,
          paddingBottom: 10,
          paddingX: 2,
          margin: "auto",
          minWidth: "1200px",
        }}
      >
        <Stack direction={"column"} spacing={4}>
          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              spacing={0}
              alignItems={"center"}
              marginBottom={2}
            >
              <Button
                variant="text"
                sx={{
                  alignItems: "center",
                  width: "fit-content",
                  textTransform: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in",
                  color: "#474747",
                  fontWeight: "400",
                  ":hover": {
                    boxShadow: "9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;",
                    transform: "translateY(-2px)",
                    "& .icon": {
                      transform: "translateX(-5px)",
                    },
                  },
                }}
                onClick={() => navigate("/doctor/doctor-test")}
              >
                <KeyboardBackspaceIcon
                  className="icon"
                  sx={{
                    marginRight: "5px",
                    fontSize: "18px",
                    color: "#474747",
                    transition: "all 0.4s ease-in",
                  }}
                />
                Quay lại
              </Button>
            </Stack>
            <Typography
              variant="h3"
              fontWeight={600}
              style={{
                textTransform: "uppercase",
                fontSize: "2rem",
              }}
            >
              {medicalTestRecord.patientCode}
            </Typography>
          </Stack>
        </Stack>

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 3,
          }}
        >
          <Grid item xs={12} md={3.5}>
            <InfoTestPatient
              medicalTestRecord={medicalTestRecord}
              basicsInfo={basicsInfo}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={8.5}
            sx={{
              borderRadius: "8px",
            }}
          >
            <Stack
              direction={"column"}
              spacing={2}
              component={Paper}
              elevation={2}
              sx={{
                borderRadius: "8px",
                paddingX: 3,
                paddingTop: 1.5,
                paddingBottom: 3,
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                Báo cáo kết quả xét nghiệm
              </Typography>

              <TextField
                variant="outlined"
                type="text"
                value={selectedFile ? selectedFile.name : ""}
                disabled
                InputProps={{
                  endAdornment: (
                    <IconButton component="label">
                      <FileUploadOutlined />
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                      />
                    </IconButton>
                  ),
                }}
              />
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#4caf50",
                    },
                  }}
                  onClick={() => setOpenComplete(true)}
                >
                  Hoàn thành
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <DialogConfirm
        cancelText={"Hủy"}
        okText={"Xác nhận"}
        open={openComplete}
        onClose={() => setOpenComplete(false)}
        title={"Xác nhận hoàn thành xét nghiệm"}
        content={"Bạn có chắc chắn muốn hoàn thành xét nghiệm này?"}
        onOk={handleUpdateMedicalTestRecord}
        onCancel={() => setOpenComplete(false)}
      />
    </>
  );
}

export default MedicalTestRecord;
