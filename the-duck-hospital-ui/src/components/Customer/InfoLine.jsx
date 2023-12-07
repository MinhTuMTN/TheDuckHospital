import React from "react";
import PropTypes from "prop-types";
import { CardMedia, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

InfoLine.prototype = {
  lableName: PropTypes.string,
  urlImage: PropTypes.string,
  value: PropTypes.string,
  dateBooking: PropTypes.string,
  lableTime: PropTypes.string,
};

function InfoLine(props) {
  return (
    <Stack direction={"row"} spacing={1}>
      <CardMedia
        component="img"
        image={props.urlImage}
        sx={{
          width: "20px",
          height: "20px",
        }}
      />

      {props.lableName && <Typography>{props.lableName}</Typography>}

      {props.dateBooking && (
        <span
          style={{
            color: "#f34312",
            fontWeight: "bold",
          }}
        >
          {dayjs(props.dateBooking).format("DD/MM/YYYY")}
        </span>
      )}

      {props.value && <Typography>{props.value}</Typography>}

      {props.lableTime && (
        <Typography
          sx={{
            color: "#0b5394",
            marginLeft: "0",
            fontWeight: "bold",
          }}
        >
          {props.lableTime}
        </Typography>
      )}
    </Stack>
  );
}

export default InfoLine;
