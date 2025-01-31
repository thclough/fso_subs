import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";

import { styled } from "@mui/material/styles";

import { Typography, Box, InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

interface FormTailProps {
  entryType: string;
}

//
const FormTail = ({ entryType }: FormTailProps) => {
  switch (entryType) {
    case "None":
      return null;
    case "HealthCheck":
      return (
        <>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component="legend">Health Rating</Typography>
            <StyledRating
              name="healthCheckRating"
              defaultValue={2}
              getLabelText={(value: number) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={1}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              max={4}
            />
          </Box>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <InputLabel style={{ marginTop: 10 }}>
            List Occupational Details
          </InputLabel>
          <TextField
            required
            name="employerName"
            label="employerName"
            fullWidth
          />
          <InputLabel component="legend">Sick Leave?</InputLabel>
          <DatePicker name="startDate" label="Start Date" format="YYYY-MM-DD" />
          <DatePicker name="endDate" label="End Date" format="YYYY-MM-DD" />
        </>
      );
    case "Hospital":
      return (
        <>
          <InputLabel style={{ marginTop: 10 }}>Discharge?</InputLabel>
          <DatePicker
            name="dateDischarge"
            label="Discharge"
            format="YYYY-MM-DD"
          />
          <InputLabel style={{ marginTop: 10 }}>Discharge Criteria</InputLabel>
          <TextField name="criteria" label="criteria" fullWidth />
        </>
      );
    default:
      throw new Error("Valid entry type not receive");
  }
};

export default FormTail;
