import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

StaffFilter.propTypes = {
  isDepartmentFilter: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  selectedValues: PropTypes.array,
  onChange: PropTypes.func,
};

StaffFilter.defaultProps = {
  isDepartmentFilter: false,
  selectedValues: [],
  onChange: () => {},
};

export default function StaffFilter(props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreIcon />}
        sx={{
          width: "fit-content",
          height: "40px",
          marginTop: "0.5rem",
          borderRadius: "15px",
          fontSize: "1rem",
          fontWeight: "500",
        }}
        onClick={handleClick}
      >
        <Typography color={theme.palette.template.darker} fontWeight={600}>
          {props.label}
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FormGroup sx={{ padding: 1 }}>
          {props?.options?.map((option, index) => (
            <FormControlLabel
              key={index}
              sx={{ padding: 0.75 }}
              control={
                <Checkbox
                  icon={icon}
                  checked={props.selectedValues.includes(
                    props?.isDepartmentFilter
                      ? option.departmentId
                      : option.value
                  )}
                  checkedIcon={checkedIcon}
                  name={
                    props?.isDepartmentFilter
                      ? option.departmentName
                      : option.name
                  }
                  onChange={props.onChange}
                  value={
                    props?.isDepartmentFilter
                      ? option.departmentId
                      : option.value
                  }
                />
              }
              label={
                props?.isDepartmentFilter ? option.departmentName : option.name
              }
            />
          ))}
        </FormGroup>
      </Popover>
    </div>
  );
}
