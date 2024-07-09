import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import HistoryRecordItem from "../../components/Customer/History/HistoryRecordItem";
import SearchNotFound from "../../components/Nurse/SearchNotFound";
import { getHistoryMedicalRecord } from "../../services/customer/MedicalRecordServices";
import { getAllPatientProfiles } from "../../services/customer/PatientProfileServices";

function PaymentHistoryPage(props) {
  const [historyRecordData, setHistoryRecordData] = React.useState([]);
  const [selectedProfile, setSelectedProfile] = React.useState("");
  const [profiles, setProfiles] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    totalPages: 2,
  });

  const handleChange = (event) => {
    setSelectedProfile(event.target.value);
    setPagination({ ...pagination, page: 1 });
  };
  const handleGetHistoryRecords = useCallback(async () => {
    const response = await getHistoryMedicalRecord(
      selectedProfile,
      pagination.page - 1
    );
    if (response.success) {
      const data = response.data.data;
      setHistoryRecordData(data.items[0]);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages,
      }));
    } else
      enqueueSnackbar("Lấy dữ liệu lịch sử khám bệnh thất bại", {
        variant: "error",
      });
  }, [selectedProfile, pagination.page]);

  useEffect(() => {
    if (selectedProfile) handleGetHistoryRecords();
  }, [selectedProfile, handleGetHistoryRecords]);

  useEffect(() => {
    const handleGetProfiles = async () => {
      const response = await getAllPatientProfiles();
      if (response.success) {
        const data = response.data.data;
        if (data.length > 0) {
          setSelectedProfile(data[0].patientProfileId);
        }
        setProfiles(data);
      } else
        enqueueSnackbar("Lấy danh sách hồ sơ bệnh nhân thất bại", {
          variant: "error",
        });
    };

    handleGetProfiles();
  }, []);
  return (
    <Box
      py={4}
      px={{
        md: 5,
        xs: 1.5,
      }}
      sx={{ width: "100%" }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6" fontSize={22}>
          Lịch sử khám bệnh
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProfile}
          placeholder="Chọn hồ sơ bệnh nhân"
          size="small"
          sx={{ minWidth: 300 }}
          onChange={handleChange}
        >
          {profiles?.map((profile) => (
            <MenuItem
              key={profile.patientProfileId}
              value={profile.patientProfileId}
            >
              {profile.fullName}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Box mt={2}>
        {historyRecordData?.items?.map((item) => (
          <HistoryRecordItem key={`${item.medicalRecordId}`} item={item} />
        ))}

        {historyRecordData?.items?.length === 0 && (
          <Box py={5}>
            <SearchNotFound text="Không có lịch sử khám bệnh nào" />
          </Box>
        )}
      </Box>

      <Stack alignItems={"flex-end"}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(e, page) => {
            setPagination({ ...pagination, page });
            console.log(page);
          }}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}

export default PaymentHistoryPage;
