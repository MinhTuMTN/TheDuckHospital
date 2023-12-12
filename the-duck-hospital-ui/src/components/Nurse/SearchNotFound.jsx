import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
}));

function SearchNotFound(props) {
  return (
    <StyledContainer>
      <Avatar
        src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702319910/52982b8b-e043-423e-a128-19bd6e562e9b_fans6w.jpg"
        sx={{
          width: "200px",
          height: "200px",
        }}
      />
      <Typography fontWeight={500}>
        Không tìm thấy kết quả nào phù hợp
      </Typography>
    </StyledContainer>
  );
}

export default SearchNotFound;
