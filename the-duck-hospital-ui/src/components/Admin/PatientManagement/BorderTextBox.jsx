import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

function BorderTextBox(props) {
  const { children, label, width, margin, ...others } = props;
  const theme = useTheme();
  return (
    <Box
      {...others}
      sx={{
        position: "relative",
        border: `2px solid ${theme.palette.template.normal2}`,
        padding: 2,
        borderRadius: "15px",
        width: width,
        boxShadow: `0px 2px 5px ${theme.palette.template.normal3}`,
        margin: margin
      }}
    >
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "-15px",
          backgroundColor: "#fff",
          padding: "0 8px",
        }}
        style={{
          fontSize: "14px",
          color: theme.palette.template.normal1,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default BorderTextBox;
