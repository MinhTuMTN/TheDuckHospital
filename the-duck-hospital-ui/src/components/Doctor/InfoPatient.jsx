import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import HistoryIcon from "@mui/icons-material/History";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

InfoPatient.propTypes = {
  mainInfo: PropTypes.object,
  info: PropTypes.array,
  history: PropTypes.any,
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

function InfoPatient(props) {
  const { mainInfo, info, history } = props;
  const initials = getInitials(mainInfo?.fullName);
  const { medicalRecordId } = useParams();
  const nagivate = useNavigate();
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
            {mainInfo?.fullName}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            style={{
              fontSize: "14px",
            }}
          >
            Giới tính: {mainInfo?.gender === "MALE" ? "Nam" : "Nữ"}
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
        {info.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </Stack>
      <Stack
        direction={"column"}
        spacing={0.5}
        alignItems={"center"}
        paddingX={1.5}
        paddingTop={1.5}
        paddingBottom={2}
        sx={{
          borderBottom: "1px solid #d1d1d1",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          width={"100%"}
          sx={{
            paddingLeft: 1.5,
          }}
        >
          <HistoryIcon sx={{ fontSize: "18px", color: "rgb(0, 148, 212)" }} />
          <Typography
            variant="body1"
            fontWeight={550}
            color={"rgb(0, 148, 212)"}
            style={{
              fontSize: "16px",
            }}
          >
            Lịch sử khám bệnh
          </Typography>
        </Stack>
        {history === null ? (
          <>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",

                paddingLeft: 1.5,
              }}
            >
              Không có lịch sử khám bệnh
            </Typography>
          </>
        ) : (
          <>
            <Stack direction={"column"} spacing={1} padding={0} width={"100%"}>
              {history?.map((row, index) => (
                <Stack
                  component={Paper}
                  elevation={1}
                  spacing={1}
                  direction={"row"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  sx={{
                    paddingX: "16px",
                    paddingY: "12px",
                  }}
                  key={`history-${index}`}
                >
                  <Stack direction={"column"} spacing={0.5} width={"100%"}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Typography
                        variant="body1"
                        fontWeight={440}
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Ngày khám:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={440}
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {dayjs(row?.date).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>

                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Typography
                        variant="body1"
                        fontWeight={400}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Chuyên khoa:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={400}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {row?.department}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton
                    onClick={() => {
                      nagivate(`/doctor/history/${row?.medicalRecordId}`, {
                        state: {
                          medicalRecordId,
                        },
                      });
                    }}
                    variant="text"
                    sx={{
                      alignItems: "center",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in",
                      color: "#474747",
                      ":hover": {
                        boxShadow:
                          "9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;",
                        transform: "translateY(2px)",
                        "& .icon": {
                          transform: "translateX(5px)",
                        },
                      },
                    }}
                  >
                    <NavigateNextIcon
                      className="icon"
                      sx={{
                        fontSize: "18px",
                        color: "#474747",
                        transition: "all 0.4s ease-in",
                      }}
                    />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default InfoPatient;
