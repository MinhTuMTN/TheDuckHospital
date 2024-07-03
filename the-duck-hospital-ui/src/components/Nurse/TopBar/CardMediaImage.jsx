import { CardMedia } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
function CardMediaImage(props) {
  const { height, width } = props;
  return (
    <CardMedia
      component={"img"}
      image={
        "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702293009/hospital-building_ue3udt.png"
      }
      sx={{
        height: height,
        width: width,
      }}
    />
  );
}

CardMediaImage.defaultProps = {
  height: "28px",
  width: "28px",
};

CardMediaImage.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default CardMediaImage;
