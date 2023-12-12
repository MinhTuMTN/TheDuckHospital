import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StaffDetail from "../../../components/Admin/StaffManagement/StaffDetail";
import { getStaffById } from "../../../services/admin/StaffServices";
import { useCallback, useEffect, useState } from "react";

const MedicineId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function MedicineDetailPage() {
  const navigate = useNavigate();
  const { staffId, departmentId } = useParams();
  const { state } = useLocation();
  const [staff, setStaff] = useState({});

    const handleGetStaff = useCallback(async () => {
      const response = await getStaffById(staffId);
      if (response.success) {
        setStaff(response.data.data);
      }
  }, [staffId]);

  useEffect(() => {
    handleGetStaff();
  }, [handleGetStaff]);

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
                state ?
                navigate(`/admin/department-management/${departmentId}`) :
                navigate("/admin/staff-management");
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
              {state ? `Thông tin khoa ${state?.departmentName}` : "Danh sách nhân viên"}
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"column"}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  style={{
                    textTransform: "uppercase",
                    fontSize: ["1.5rem", "2rem"],
                  }}
                >
                  {staff.fullName}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    variant="body1"
                    fontWeight={450}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    staff_id:
                  </Typography>
                  <MedicineId>{staff.staffId}</MedicineId>
                </Stack>
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
                <StaffDetail staff={staff} handleGetStaff={handleGetStaff} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MedicineDetailPage;
