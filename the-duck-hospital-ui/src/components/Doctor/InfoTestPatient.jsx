import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

InfoTestPatient.propTypes = {
  mainInfo: PropTypes.object,
  basicsInfo: PropTypes.array,
};

const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length >= 2) {
    return words[0][0] + words[words.length - 1][0];
  } else {
    return name[0];
  }
};

function Row(props) {
  const { row } = props;
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <div>{row.icon}</div>
        <Typography
          variant="body1"
          fontWeight={400}
          style={{
            fontSize: "14px",
          }}
        >
          {row.label}
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        fontWeight={500}
        style={{
          fontSize: "14px",
        }}
      >
        {row.value}
      </Typography>
    </Stack>
  );
}

function InfoTestPatient(props) {
  const { medicalTestRecord, basicsInfo } = props;
  const initials = getInitials(medicalTestRecord?.patientName);
  return (
    <Stack
      direction={"column"}
      component={Paper}
      elevation={2}
      sx={{
        borderRadius: "8px",
      }}
    >
      <Stack
        direction={"row"}
        spacing={1.5}
        alignItems={"center"}
        paddingX={3}
        paddingY={1.5}
        sx={{
          borderBottom: "1px solid #d1d1d1",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            margin: "auto",
            border: "1px solid #d1d1d1",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          {initials}
        </Box>
        <Stack direction={"column"} spacing={0.2}>
          <Typography
            variant="body1"
            fontWeight={500}
            style={{
              fontSize: "16px",
            }}
          >
            {medicalTestRecord?.patientName}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            style={{
              fontSize: "14px",
            }}
          >
            Giới tính: {medicalTestRecord?.patientGender === "MALE" ? "Nam" : "Nữ"}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"column"}
        spacing={0.5}
        alignItems={"center"}
        paddingX={3}
        paddingY={1.5}
        sx={{
          borderBottom: "1px solid #d1d1d1",
        }}
      >
        {basicsInfo.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </Stack>
    </Stack>
  );
}

export default InfoTestPatient;
