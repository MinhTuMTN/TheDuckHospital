import { SearchOutlined } from "@mui/icons-material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { appColors } from "../../../utils/appColorsUtils";

const listShift = [
  {
    value: "MORNING",
    label: "Ca sáng",
    color: appColors.error,
  },
  {
    value: "AFTERNOON",
    label: "Ca chiều",
    color: appColors.successText,
  },
  {
    value: "EVENING",
    label: "Ca tối",
    color: "#003768",
  },
  {
    value: "NIGHT",
    label: "Ca khuya",
    color: "#ed128e",
  },
];

function RightFilterHeaderNurse(props) {
  const {
    listRoom,
    room,
    setRoom,
    selectedShift,
    setSelectedShift,
    name,
    setName,
    onSearch,
    onClose,
  } = props;
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
  };
  return (
    <Stack direction={"column"} flex={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{
          padding: "16px 8px 8px 20px",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <TuneIcon
            fontSize="small"
            style={{
              marginRight: "4px",
            }}
          />
          <Typography variant="h6" fontSize={"1.125rem"} letterSpacing={0.5}>
            Bộ lọc
          </Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack direction={"column"} marginY={2} paddingX={"20px"} spacing={1}>
        <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
          <LocalHospitalIcon
            sx={{
              fontSize: "20px",
            }}
          />
          <Typography variant="subtitle2" letterSpacing={1}>
            Phòng
          </Typography>
        </Stack>
        <FormControl fullWidth size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={room}
            onChange={handleChangeRoom}
          >
            {listRoom.map((item) => (
              <MenuItem key={item.roomId} value={item}>
                {item.roomName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction={"column"} marginBottom={2} paddingX={"20px"}>
        <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
          <ChecklistRtlIcon
            sx={{
              fontSize: "20px",
            }}
          />
          <Typography variant="subtitle2" letterSpacing={1}>
            Ca trực
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          useFlexGap
          flexWrap="wrap"
          style={{
            marginTop: "4px",
            rowGap: "12px",
            columnGap: "16px",
          }}
        >
          {listShift.map((item) => (
            <Button
              onClick={() =>
                setSelectedShift((prev) => {
                  if (prev.includes(item.value)) {
                    return prev.filter((shift) => shift !== item.value);
                  }
                  return [...prev, item.value].sort((a, b) => {
                    const order = ["MORNING", "AFTERNOON", "EVENING", "NIGHT"];
                    return order.indexOf(a) - order.indexOf(b);
                  });
                })
              }
              key={item.value}
              variant="outlined"
              size="medium"
              style={{
                color: selectedShift.includes(item.value)
                  ? appColors.white
                  : appColors.gray,
                backgroundColor: selectedShift.includes(item.value)
                  ? item.color
                  : "transparent",
                borderColor: selectedShift.includes(item.value)
                  ? item.color
                  : appColors.gray,
                width: "122px",
                borderRadius: "8px",
                padding: "4px 8px",
                fontWeight: 450,
                textTransform: "none",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Stack
        flex={1}
        direction={"column"}
        marginBottom={2}
        paddingX={"20px"}
        spacing={"6px"}
      >
        <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
          <PersonIcon
            sx={{
              fontSize: "20px",
            }}
          />
          <Typography variant="subtitle2" letterSpacing={1}>
            Tìm theo tên
          </Typography>
        </Stack>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          size="medium"
          color="oldPrimary"
          InputProps={{
            style: {
              padding: "4px",
            },
          }}
        />
      </Stack>
      <Box width={"100%"} marginBottom={2} paddingX={"20px"} spacing={"6px"}>
        <Button
          onClick={onSearch}
          fullWidth
          style={{
            backgroundColor: appColors.primary,
            textTransform: "none",
          }}
          variant="contained"
          startIcon={<SearchOutlined />}
        >
          Tìm kiếm
        </Button>
      </Box>
    </Stack>
  );
}

export default RightFilterHeaderNurse;
