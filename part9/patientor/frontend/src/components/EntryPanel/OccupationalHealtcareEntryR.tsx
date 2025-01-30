import { OccupationalHealthcareEntry } from "../../types";
import EntryBody from "./EntryBody";
import WorkIcon from "@mui/icons-material/Work";
import { Typography } from "@mui/material";

const OccupationalHealthcareEntryR: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <EntryBody
        entry={entry}
        icon={() => (
          <>
            <WorkIcon />
          </>
        )}
      />
      {entry.sickLeave && (
        <div>
          <Typography variant="body1">
            Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryR;
