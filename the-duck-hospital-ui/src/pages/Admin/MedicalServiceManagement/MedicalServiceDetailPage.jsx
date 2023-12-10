import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServiceById } from "../../../services/admin/MedicalServiceServices";
import MedicalServiceDetail from "../../../components/Admin/MedicalServiceManagment/MedicalServiceDetail";

function MedicalServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({});

  useEffect(() => {
    const handleGetMedicalService = async () => {
      const response = await getServiceById(serviceId);
      if (response.success) {
        setService(response.data.data);
      }
    }
    handleGetMedicalService();
  }, [serviceId]);

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
                navigate("/admin/service-management");
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
              Danh sách dịch vụ
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
                {service.serviceName}
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
                <MedicalServiceDetail service={service} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MedicalServiceDetailPage;
