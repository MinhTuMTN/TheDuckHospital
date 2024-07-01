import {
  BiotechOutlined,
  CalendarMonthOutlined,
  ContentPasteOutlined,
  DeleteOutlineOutlined,
  DownloadOutlined,
  EditNoteOutlined,
  PrintOutlined,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography, styled } from "@mui/material";
import React, { memo, useContext } from "react";
import { appColors } from "../../../utils/appColorsUtils";
import dayjs from "dayjs";
import Invoice from "../../Doctor/Invoice";
import { useReactToPrint } from "react-to-print";
import { HospitalizationContext } from "../../../pages/Nurse/Hospitalization/HospitalizationDetails";
import { enqueueSnackbar } from "notistack";
import { deleteInpatientMedicalTest } from "../../../services/nurse/HospitalizeServices";

const LineInfo = memo((props) => {
  return (
    <Grid container columnGap={"4px"}>
      <Grid
        item
        xs={props.mode === "small" ? 1 : 4}
        display={"flex"}
        columnGap={"4px"}
      >
        {props.icon}
        {props.mode !== "small" && (
          <Typography
            sx={[
              {
                color: appColors.primary,
                fontWeight: 600,
              },
              props.nameStyles,
            ]}
          >
            {props.name}
          </Typography>
        )}
      </Grid>
      <Grid item xs={props.mode === "small" ? 10 : 7}>
        <Typography sx={props.valueStyles}>{props.value}</Typography>
      </Grid>
    </Grid>
  );
});

const MedicalTestContainer = styled(Grid)({
  padding: "16px 8px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
});

function MedicalTestItem(props) {
  const { mode = "normal", medicalTest } = props;
  const componentRef = React.useRef();
  const { generalInfo } = useContext(HospitalizationContext);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleViewResult = () => {
    if (!medicalTest.result) {
      enqueueSnackbar("Chưa có kết quả xét nghiệm", {
        variant: "error",
      });
      return;
    }

    // Open in new tab
    window.open(medicalTest.result, "_blank");
  };
  const handleDelete = async () => {
    const response = await deleteInpatientMedicalTest(
      generalInfo.hospitalAdmissionId,
      medicalTest.medicalTestId
    );

    if (response.success) {
      enqueueSnackbar("Xoá xét nghiệm thành công", {
        variant: "success",
      });
    } else {
      if (response.errorCode === 3000)
        enqueueSnackbar("Không thể xoá xét nghiệm đã thanh toán", {
          variant: "error",
        });
      else if (response.errorCode === 3001)
        enqueueSnackbar("Không thể xoá xét nghiệm đã có kết quả", {
          variant: "error",
        });
      else
        enqueueSnackbar("Xoá xét nghiệm thất bại", {
          variant: "error",
        });
    }
  };
  return (
    <>
      <MedicalTestContainer item xs={12} container>
        <Grid item xs={mode === "small" ? 11 : 9} container rowGap={1}>
          <LineInfo
            mode={mode}
            icon={
              <BiotechOutlined
                sx={{
                  color: appColors.primary,
                }}
              />
            }
            name="Loại xét nghiệm"
            value={medicalTest.serviceName}
          />
          <LineInfo
            mode={mode}
            icon={
              <EditNoteOutlined
                sx={{
                  color: appColors.primary,
                }}
              />
            }
            name="Chỉ định"
            value={medicalTest.note}
          />
          <LineInfo
            mode={mode}
            icon={
              <CalendarMonthOutlined
                sx={{
                  color: appColors.primary,
                }}
              />
            }
            name="Ngày thực hiện"
            value={dayjs(medicalTest.createdDate).format("DD/MM/YYYY - HH:mm")}
          />
          <LineInfo
            mode={mode}
            icon={
              <ContentPasteOutlined
                sx={{
                  color: appColors.error,
                }}
              />
            }
            nameStyles={{
              color: appColors.error,
            }}
            valueStyles={{
              color: appColors.error,
              fontWeight: 600,
            }}
            name="Kết quả xét nghiệm"
            value={medicalTest.testResult || "Chưa có kết quả"}
          />
        </Grid>
        <Divider orientation="vertical" />
        <Grid
          item
          container
          xs={mode === "small" ? 0.8 : 2.8}
          display={"flex"}
          rowGap={2}
          pl={1}
        >
          <Grid
            sx={{
              cursor: medicalTest.result ? "pointer" : "not-allowed",
            }}
            onClick={handleViewResult}
            item
            xs={12}
            display={"flex"}
            columnGap={1}
          >
            <DownloadOutlined
              sx={{
                color: appColors.doneText,
              }}
            />
            {mode !== "small" && (
              <Typography
                sx={{
                  color: appColors.doneText,
                  fontWeight: 600,
                }}
              >
                Kết quả xét nghiệm
              </Typography>
            )}
          </Grid>
          <Grid
            sx={{
              cursor: "pointer",
            }}
            item
            xs={12}
            display={"flex"}
            columnGap={1}
            onClick={handlePrint}
          >
            <PrintOutlined
              sx={{
                color: appColors.primary,
              }}
            />
            {mode !== "small" && (
              <Typography
                sx={{
                  color: appColors.primary,
                  fontWeight: 600,
                }}
              >
                In phiếu xét nghiệm
              </Typography>
            )}
          </Grid>
          <Grid
            sx={{
              cursor: "pointer",
            }}
            onClick={handleDelete}
            item
            xs={12}
            display={"flex"}
            columnGap={1}
          >
            <DeleteOutlineOutlined
              sx={{
                color: appColors.error,
              }}
            />
            {mode !== "small" && (
              <Typography
                sx={{
                  color: appColors.error,
                  fontWeight: 600,
                }}
              >
                Xoá xét nghiệm
              </Typography>
            )}
          </Grid>
        </Grid>
      </MedicalTestContainer>
      <Box sx={{ display: "none" }}>
        <Invoice
          ref={componentRef}
          patientInfo={{
            patient: {
              fullName: generalInfo.patientName,
              dateOfBirth: generalInfo.dateOfBirth,
              patientCode: generalInfo.patientCode,
              address: generalInfo.provinceName,
            },
          }}
          doctorName={""}
          medicalTest={medicalTest}
        />
      </Box>
    </>
  );
}

export default MedicalTestItem;
