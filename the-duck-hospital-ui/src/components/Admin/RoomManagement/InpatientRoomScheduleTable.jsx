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
            {row.doctorName}
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
            {row.phoneNumber}
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
      </TableRow>
    </React.Fragment>
  );
}

function InpatientRoomScheduleTable(props) {
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
                <TableCell style={{ width: "35%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Họ tên
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Số điện thoại
                  </CustomText>
                </TableCell>
                <TableCell style={{ width: "30%" }}>
                  <CustomText style={{ fontWeight: "500" }} color={"#101828"}>
                    Buổi trực
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

InpatientRoomScheduleTable.propTypes = {
  items: PropTypes.array,
};

export default InpatientRoomScheduleTable;
