import { useState, useContext } from "react";

import BlendedContext from "../../context";
import FormTail from "./FormTail";

import { DateField } from "@mui/x-date-pickers";

import {
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { NewEntry, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddHealthCheckEntryForm = ({ onCancel, onSubmit }: Props) => {
  const diagnoses = useContext(BlendedContext);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<Diagnosis[]>();
  const [entryType, setEntryType] = useState("None");

  const entryOptions = [
    { normal: "Health Check", condensed: "HealthCheck" },
    { normal: "Occupational Healthcare", condensed: "OccupationalHealthcare" },
    { normal: "Hospital", condensed: "Hospital" },
  ];

  const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData.get("type"));

    const baseEntry: {
      [key: string]:
        | string
        | string[]
        | number
        | { startDate: string; endDate: string }
        | { date: string; criteria: string };
    } = {
      description: String(formData.get("description")),
      date: String(formData.get("date")),
      specialist: String(formData.get("specialist")),
      type: String(formData.get("type")),
    };

    if (String(formData.get("type")) === "HealthCheck") {
      baseEntry.healthCheckRating =
        4 - Number(formData.get("healthCheckRating"));
    } else if (String(formData.get("type")) === "OccupationalHealthcare") {
      baseEntry["employerName"] = String(formData.get("employerName"));

      if (formData.get("startDate") || formData.get("endDate")) {
        if (formData.get("startDate") && formData.get("endDate")) {
          baseEntry.sickLeave = {
            startDate: String(formData.get("startDate")),
            endDate: String(formData.get("endDate")),
          };
        }
      }
    } else if (String(formData.get("type")) === "Hospital") {
      if (formData.get("dateDischarge") || formData.get("criteria")) {
        if (formData.get("dateDischarge") && formData.get("criteria")) {
          baseEntry.discharge = {
            date: String(formData.get("dateDischarge")),
            criteria: String(formData.get("criteria")),
          };
        }
      }
    } else {
      throw new Error("What the heck");
    }

    if (selectedDiagnoses) {
      baseEntry["diagnosisCodes"] = selectedDiagnoses.map((diag) => diag.code);
    }
    onSubmit(baseEntry as NewEntry);
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setEntryType(event.target.value);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <DateField
          required
          name="date"
          label="date of visit"
          format="YYYY-MM-DD"
        />
        <TextField required name="specialist" label="specialist" fullWidth />
        <TextField required name="description" label="description" fullWidth />
        <Autocomplete
          multiple
          id="tags-standard"
          options={diagnoses}
          getOptionLabel={(option) => option.code + " " + option.name}
          onChange={(_, newValue) => setSelectedDiagnoses(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Diagnoses"
              placeholder="Select or search for diagnosis"
            />
          )}
        />
        <Typography variant="body1" style={{ marginTop: 20 }}>
          Entry Specific Inputs
        </Typography>
        <InputLabel style={{ marginTop: 10 }}>Select Entry Type</InputLabel>
        <Select
          value={entryType}
          name="type"
          label="entry type"
          onChange={onEntryTypeChange}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {entryOptions.map((option) => (
            <MenuItem key={option.condensed} value={option.condensed}>
              {option.normal}
            </MenuItem>
          ))}
        </Select>
        <FormTail entryType={entryType} />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddHealthCheckEntryForm;
