import { Box, Typography, styled } from "@mui/material";

const RootPageNotifications = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: theme.spacing(5),
}));

function Notifications() {
    return (
        <RootPageNotifications>
            <Typography>Notifications</Typography>
            <Typography variant="h3">Danh sách thông báo</Typography>
            <Typography marginTop={5} variant="body1" align="center" >Bạn chưa có thông báo.</Typography>
        </RootPageNotifications>
    );
}

export default Notifications;