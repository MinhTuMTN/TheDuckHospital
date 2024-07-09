import styled from "@emotion/styled";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

function useCustomMediaQuery() {
  const isLargeScreen = useMediaQuery("(min-width: 850px)");
  const isMediumScreen = useMediaQuery("(min-width: 750px)");

  return useMemo(() => {
    if (isLargeScreen) {
      return "300px";
    } else if (isMediumScreen) {
      return "150px";
    } else {
      return "50px";
    }
  }, [isLargeScreen, isMediumScreen]);
}

const scheduleSessions = [
  {
    key: "MORNING",
    value: "Buổi sáng",
  },
  {
    key: "AFTERNOON",
    value: "Buổi chiều",
  },
  {
    key: "EVENING",
    value: "Buổi tối",
  },
  {
    key: "NIGHT",
    value: "Buổi khuya",
  },
];

function Row(props) {
  const { row } = props;

  const maxWidth = useCustomMediaQuery();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.scheduleType === "EXAMINATION" ? "Phòng khám" : "Nội trú"}
          </CustomText>
        </TableCell>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {
              scheduleSessions.find((type) => type.key === row.scheduleSession)
                ?.value
            }
          </CustomText>
        </TableCell>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.roomName}
          </CustomText>
        </TableCell>
        <TableCell>
          <CustomText
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: maxWidth,
            }}
          >
            {row.departmentName}
          </CustomText>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ScheduleStaffTable(props) {
  const { items } = props;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Table
            sx={{
              "& .MuiTableCell-sizeMedium": {
                paddingX: "20px !important",
              },
            }}
          >
            <TableHead
              sx={{
                bgcolor: "#F5F6FA",
              }}
            >
              <TableRow>
                <TableCell style={{ width: "25%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Loại ca trực
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "25%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Buổi trực
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "25%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Phòng
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "25%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Khoa
                  </CustomText>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
}

ScheduleStaffTable.propTypes = {
  items: PropTypes.array,
};

export default ScheduleStaffTable;
