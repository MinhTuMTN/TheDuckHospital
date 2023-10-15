import { Box, Typography, styled } from "@mui/material";

const RootPageMedicalBills = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: theme.spacing(5),
}));

function MedicalBills() {
    return (
        <RootPageMedicalBills>
            <Typography>Medical Bills</Typography>
            <Typography variant="h3">Danh sách phiếu khám bệnh</Typography>
            <Typography marginTop={5} variant="body1" align="center" >Bạn chưa có thông tin khám.</Typography>
        </RootPageMedicalBills>
    );
}

export default MedicalBills;