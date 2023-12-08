import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import MedicalBillItem from "./MedicalBillItem";

function MedicalBillProfileItem(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      component={Paper}
      sx={{
        borderRadius: ".5rem",
      }}
      px={1}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: open ? "template.normal1" : "#fff",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          borderBottomLeftRadius: open ? "" : ".5rem",
          borderBottomRightRadius: open ? "" : ".5rem",
          marginX: -1,
          paddingX: 1,
          border: "1px solid #ddd",
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography
          variant="body"
          fontSize={16}
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: open ? "#fff" : "template.normal1",
          }}
          color={"template.normal1"}
        >
          Nguyen Van A
        </Typography>
        <IconButton>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MedicalBillItem />
        <MedicalBillItem />
      </Collapse>
    </Box>
  );
}

export default MedicalBillProfileItem;
