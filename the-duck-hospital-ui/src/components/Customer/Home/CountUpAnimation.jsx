import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const CountUpAnimation = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount < value ? prevCount + 1 : prevCount));
    }, 20);

    // Clear the interval after the count reaches the provided value
    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <Typography
      variant="h2"
      sx={{
        color: "#fff",
        fontSize: {
          xs: "40px",
          md: "100px",
        },
        fontWeight: "700",
      }}
    >
      {count}
    </Typography>
  );
};

CountUpAnimation.propTypes = {
  value: PropTypes.number.isRequired,
};

export default CountUpAnimation;
