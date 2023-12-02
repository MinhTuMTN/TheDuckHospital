import { Box, Typography, styled } from "@mui/material";

const RootPagePatientRecords = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: theme.spacing(5),
}));

function PatientRecords() {
    return (
        <RootPagePatientRecords>
            <Typography>Patient's Records</Typography>
            <Typography variant="h3">Danh sách hồ sơ bệnh nhân</Typography>
            <Typography marginTop={5} variant="body1" align="center" >Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.</Typography>
        </RootPagePatientRecords>
    );
}

export default PatientRecords;