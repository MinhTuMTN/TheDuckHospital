import { Divider, Grid, Stack, Typography, styled } from "@mui/material";
import React, { memo } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { appColors } from "../../../utils/appColorsUtils";
import {
  BiotechOutlined,
  CalendarMonthOutlined,
  ContentPasteGoOutlined,
  ContentPasteOutlined,
  DeleteOutlineOutlined,
  DownloadOutlined,
  EditNoteOutlined,
  PrintOutlined,
} from "@mui/icons-material";

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
  const { mode = "normal" } = props;
  return (
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
          value="Xét nghiệm máu"
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
          value="Chỉ định thực hiện"
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
          value="12/12/2021 - 22:00"
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
          value="Bình thường. Không có dấu hiệu bất thường"
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
        <Grid item xs={12} display={"flex"} columnGap={1}>
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
        <Grid item xs={12} display={"flex"} columnGap={1}>
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
        <Grid item xs={12} display={"flex"} columnGap={1}>
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
  );
}

export default MedicalTestItem;
