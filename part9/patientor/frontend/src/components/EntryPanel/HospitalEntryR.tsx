import { Typography } from "@mui/material";
import { HospitalEntry } from "../../types";
import EntryBody from "./EntryBody";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryR: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <EntryBody
        entry={entry}
        icon={() => (
          <>
            <LocalHospitalIcon />
          </>
        )}
      />
      {entry.discharge && (
        <div>
          <Typography variant="body1">
            <b>{entry.discharge.date}</b> Discharged
            <br />
            <i>{entry.discharge.criteria}</i>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default HospitalEntryR;
