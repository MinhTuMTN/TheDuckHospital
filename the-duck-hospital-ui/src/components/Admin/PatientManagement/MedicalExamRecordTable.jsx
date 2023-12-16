import styled from "@emotion/styled";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MedicalExamRecordItem from "./MedicalExamRecordItem";

const BoxStyle = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E0E0E0",
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "12px !important",
  paddingBottom: "12px !important",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem !important",
  variant: "subtitle1",
  fontWeight: "720 !important",
  width: "100%",
}));

// const items = [
//   {
//     s: 1,
//     a: 3,
//   },
//   {
//     s: 1,
//     a: 3,
//   },
//   {
//     s: 1,
//     a: 3,
//   },
//   {
//     s: 1,
//     a: 3,
//   },
// ];

function MedicalExamRecordTable(props) {
  const { items } = props;
  const [expanded, setExpanded] = useState("panel-");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Stack
        sx={{
          borderRadius: "15px",
          paddingTop: 1,
        }}
      >
        <BoxStyle>
          <Stack direction={"row"}>
            <TieuDe>Hồ sơ bệnh án</TieuDe>
          </Stack>
        </BoxStyle>
        <Box padding={2} sx={{ width: "100%" }}>
            {items.map((item, index) => (
              <MedicalExamRecordItem
                item={item}
                key={index}
                panel={"panel-" + index}
                expanded={expanded}
                handleChange={handleChange}
              />
            ))}
        </Box>
      </Stack>
    </>
  );
}

export default MedicalExamRecordTable;
