import { FilterAltOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Stack,
  TablePagination,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import MedicalTestItem from "./MedicalTestItem";

const ContainerLayout = styled(Grid)({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
});

function ListInpatientMedicalTest(props) {
  const {
    medicalTestServices,
    onChangeServiceId = () => {},
    medicalTests,
    pagination,
    onPaginate,
    onRefresh,
  } = props;
  return (
    <ContainerLayout item xs={12}>
      <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
        Danh sách xét nghiệm
      </Typography>
      <Stack direction={"row"} spacing={4} alignItems={"center"} mt={1}>
        <Box display={"flex"}>
          <FilterAltOutlined />
          <Typography>Loại xét nghiệm</Typography>
        </Box>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          disableClearable
          options={[
            {
              serviceId: 0,
              serviceName: "Tất cả",
            },
            ...medicalTestServices,
          ]}
          getOptionLabel={(option) => option.serviceName}
          placeholder="Tên dịch vụ"
          sx={{
            flex: 1,
          }}
          isOptionEqualToValue={(option, value) =>
            option.serviceId === value.serviceId
          }
          onChange={(e, value) => onChangeServiceId(value.serviceId)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Xét nghiệm" />
          )}
        />
      </Stack>
      <Divider sx={{ marginTop: "16px" }} />

      <Grid container>
        {medicalTests.map((medicalTest, index) => (
          <MedicalTestItem
            key={`medical-test-${index}`}
            medicalTest={medicalTest}
            onRefresh={onRefresh}
          />
        ))}
      </Grid>

      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page}
        onPageChange={(e, newPage) => {
          onPaginate((prev) => {
            return {
              ...prev,
              page: newPage,
            };
          });
        }}
        rowsPerPageOptions={[1, 5, 10, 25]}
        rowsPerPage={pagination.size}
        onRowsPerPageChange={(e) => {
          onPaginate((prev) => {
            return {
              ...prev,
              size: e.target.value,
              page: 0,
            };
          });
        }}
      />
    </ContainerLayout>
  );
}

export default ListInpatientMedicalTest;
