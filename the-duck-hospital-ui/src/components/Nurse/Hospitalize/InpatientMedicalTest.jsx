import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { memo } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MedicalTestItem from "./MedicalTestItem";

const ContainerLayout = styled(Grid)({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
});

const Label = styled(FormLabel)({
  fontSize: "14px",
  marginBottom: "5px",
});
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "4px 4px",
  },
}));

const testServices = [
  { serviceName: "Xét nghiệm máu" },
  { serviceName: "Xét nghiệm nước tiểu" },
  { serviceName: "Xét nghiệm nước tiểu" },
  { serviceName: "Xét nghiệm nước tiểu" },
  { serviceName: "Xét nghiệm nước tiểu" },
  { serviceName: "Xét nghiệm nước tiểu" },
];

function InpatientMedicalTest() {
  const [selectedTest, setSelectedTest] = React.useState({
    service: null,
  });
  return (
    <Grid container>
      <ContainerLayout item xs={12}>
        <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
          Tạo xét nghiệm mới
        </Typography>
        <Stack spacing={"16px"} mt={"16px"}>
          <FormControl fullWidth>
            <Label>Loại xét nghiệm</Label>
            <Autocomplete
              size="medium"
              disablePortal
              id="combo-box-demo"
              options={testServices}
              getOptionLabel={(option) => option.serviceName}
              placeholder="Tên dịch vụ"
              value={selectedTest.service}
              onChange={(event, newValue) => {
                setSelectedTest({
                  ...selectedTest,
                  service: newValue,
                });
              }}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} placeholder="Xét nghiệm" />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Label>Chỉ định</Label>
            <CustomTextField
              size="medium"
              sx={{}}
              fullWidth
              placeholder="Chỉ định thực hiện"
            />
          </FormControl>
          <Stack display={"flex"} direction={"row"} justifyContent={"flex-end"}>
            <Button
              sx={{
                flexBasis: "20%",
                width: "20%",
              }}
              variant="outlined"
            >
              Tạo xét nghiệm
            </Button>
          </Stack>
        </Stack>
      </ContainerLayout>

      <ContainerLayout item xs={12}>
        <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
          Danh sách xét nghiệm
        </Typography>
        <Stack direction={"row"} spacing={4} alignItems={"center"} mt={1}>
          <Box display={"flex"}>
            <FilterAltOutlinedIcon />
            <Typography>Loại xét nghiệm</Typography>
          </Box>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={testServices}
            getOptionLabel={(option) => option.serviceName}
            placeholder="Tên dịch vụ"
            sx={{
              flex: 1,
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Xét nghiệm" />
            )}
          />
        </Stack>
        <Divider sx={{ marginTop: "16px" }} />

        <Grid container>
          <MedicalTestItem />
          <MedicalTestItem />
          <MedicalTestItem />
        </Grid>
      </ContainerLayout>
    </Grid>
  );
}

export default InpatientMedicalTest;
