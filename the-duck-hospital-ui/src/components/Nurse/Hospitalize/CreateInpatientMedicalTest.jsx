import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { appColors } from "../../../utils/appColorsUtils";
import { createInpatientMedicalTest } from "../../../services/nurse/HospitalizeServices";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

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

function CreateInpatientMedicalTest(props) {
  const { medicalTestServices } = props;
  const [selectedService, setSelectedService] = React.useState(null);
  const [note, setNote] = React.useState("");
  const { hospitalizationId } = useParams();

  const handleCreateInpatientMedicalTest = async () => {
    if (!selectedService) {
      enqueueSnackbar("Vui lòng chọn loại xét nghiệm", { variant: "error" });
      return;
    }
    const response = await createInpatientMedicalTest(hospitalizationId, {
      serviceId: selectedService.serviceId,
      note: note,
    });
    if (response.success) {
      enqueueSnackbar("Tạo xét nghiệm thành công", { variant: "success" });
      setNote("");
      setSelectedService(null);
    } else {
      enqueueSnackbar("Tạo xét nghiệm thất bại", { variant: "error" });
    }
  };
  return (
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
            options={medicalTestServices}
            getOptionLabel={(option) => option.serviceName}
            placeholder="Tên dịch vụ"
            value={selectedService}
            onChange={(event, newValue) => {
              setSelectedService(newValue);
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
            autoComplete="off"
            fullWidth
            placeholder="Chỉ định thực hiện"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </FormControl>
        <Stack display={"flex"} direction={"row"} justifyContent={"flex-end"}>
          <Button
            sx={{
              flexBasis: "20%",
              width: "20%",

              "&:hover": {
                backgroundColor: appColors.primary,
                color: "#fff",
              },
            }}
            onClick={handleCreateInpatientMedicalTest}
            variant="outlined"
          >
            Tạo xét nghiệm
          </Button>
        </Stack>
      </Stack>
    </ContainerLayout>
  );
}

export default CreateInpatientMedicalTest;
