import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentDetail from "../../../components/Admin/DepartmentManagement/DepartmentDetail";
import DoctorTable from "../../../components/Admin/DepartmentManagement/DoctorTable";
import { addDoctorDepartment, getDepartmentById } from "../../../services/admin/DepartmentServices";
import { enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { getDoctorsNotInDepartment } from "../../../services/admin/DoctorServices";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingX: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));


function DepartmentDetailPage() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleGetDepartment = async () => {
      const response = await getDepartmentById(departmentId);
      if (response.success) {
        response.data.data.doctors.sort((a, b) => {
          if (a.headOfDepartment === b.headOfDepartment) {
            return 0;
          } else if (a.headOfDepartment) {
            return -1;
          } else {
            return 1;
          }
        });
        setDepartment(response.data.data);
      }
    }
    handleGetDepartment();
  }, [departmentId]);

  const handleAddDoctorDepartment = async () => {
    const response = await addDoctorDepartment(departmentId, selectedDoctor);
    if (response.success) {
      enqueueSnackbar("Thêm bác sĩ vào khoa thành công", { variant: "success" });
      setOpenPopup(false);
      navigate(0);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }

  const handleGetAllDoctorNotInDepartment = async () => {
    const response = await getDoctorsNotInDepartment();
    if (response.success) {
      setDoctors(response.data.data);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }

  return (
    <Box
      sx={{
        pt: 3,
        paddingBottom: 10,
        paddingX: 3,
        margin: "auto",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"}>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            marginBottom={3}
          >
            <IconButton
              aria-label="back"
              size="small"
              padding="0"
              margin="0"
              color="#111927"
              onClick={() => {
                navigate("/admin/department-management");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={600}
              style={{
                fontSize: "14px",
                color: "#111927",
              }}
            >
              Danh sách khoa
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Typography
                variant="h3"
                fontWeight={600}
                style={{
                  textTransform: "uppercase",
                  fontSize: ["1.5rem", "2rem"],
                }}
              >
                {department.departmentName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <DepartmentDetail
                  department={department}
                  headDoctorId={department.headDoctorId}
                  headDoctorName={department.headDoctorName}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Stack
                component={Paper}
                elevation={3}
                sx={{
                  marginTop: 4,
                  borderRadius: "15px",
                }}
                spacing={"2px"}
              >
                <DoctorTable
                  items={department.doctors}
                  setOpenPopup={setOpenPopup}
                  handleGetAllDoctorNotInDepartment={handleGetAllDoctorNotInDepartment}
                  departmentId={departmentId}
                  departmentName={department.departmentName}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <BootstrapDialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="customized-dialog-title"
        sx={{
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <DialogTitle sx={{ m: 0, px: 4, py: 2 }} id="customized-dialog-title">
          <Typography
            style={{
              fontSize: "24px",
            }}
            sx={{
              fontWeight: 700,
            }}
          >
            Chỉnh sửa
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          style={{
            padding: "0px 32px 0px 32px",
            width: isSmallScreen ? "30rem" : "35rem",
          }}
        >
          <Stack direction={"column"} spacing={2}>
            <Box>
              <Typography
                variant="body1"
                style={{
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Bác sĩ
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedDoctor}
                  onChange={(e) =>
                    setSelectedDoctor(e.target.value,)
                  }
                  displayEmpty
                  required
                  size="small"
                  sx={{
                    fontSize: "14px !important",
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {doctors?.map((item, index) => (
                    <MenuItem value={item.staffId} key={index} >
                      <Typography style={{ fontSize: "14px" }}>
                        {item.fullName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddDoctorDepartment}>
            Thêm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}

export default DepartmentDetailPage;
