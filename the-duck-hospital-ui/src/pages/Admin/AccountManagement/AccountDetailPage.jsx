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
import { useNavigate, useParams } from "react-router-dom";
import AccountDetail from "../../../components/Admin/AccountManagement/AccountDetail";
import PatientProfileTable from "../../../components/Admin/PatientManagement/PatientProfileTable";
import { useCallback, useEffect, useState } from "react";
import { getAccountById } from "../../../services/admin/AccountServices";

const UserId = styled(Typography)(({ theme }) => ({
  backgroundColor: "#d6d7db",
  padding: "2px 5px",
  borderRadius: "15px",
  fontSize: "13px !important",
  alignItems: "center",
  fontWeight: "500",
  width: "fit-content",
}));

function AccountDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  const handleGetAccount = useCallback(async () => {
    const response = await getAccountById(userId);
    if (response.success) {
      setAccount(response.data.data);
    }
  }, [userId]);

  useEffect(() => {
    handleGetAccount();
  }, [handleGetAccount]);


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
              onClick={() => { navigate("/admin/account-management") }}
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
              Danh sách tài khoản
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
                  {account.fullName}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    variant="body1"
                    fontWeight={450}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    user_id:
                  </Typography>
                  <UserId>{account.userId}</UserId>
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
                <AccountDetail
                  account={account}
                  handleGetAccount={handleGetAccount}
                />
              </Stack>
            </Grid>
          </Grid>
          {account.patientProfiles?.length > 0 &&
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
                  <PatientProfileTable
                    items={account.patientProfiles}
                    userId={userId}
                    userName={account.fullName}
                  />
                </Stack>
              </Grid>
            </Grid>}
        </Stack>
      </Stack>
    </Box>
  );
}

export default AccountDetailPage;
