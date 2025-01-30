import { HealthCheckEntry } from "../../types";
import EntryBody from "./EntryBody";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import { Typography, Box } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import WarningIcon from "@mui/icons-material/Warning";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

const HealthCheckEntryR: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const HealthCheckRatingIcons = {
    0: <HowToRegIcon />,
    1: <MonitorHeartIcon />,
    2: <WarningIcon />,
    3: <CrisisAlertIcon />,
  };
  return (
    <div>
      <EntryBody
        entry={entry}
        icon={() => (
          <>
            <HealthAndSafetyIcon />
          </>
        )}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body1">
          <b>Status:</b>
        </Typography>
        {HealthCheckRatingIcons[entry.healthCheckRating]}
      </Box>
    </div>
  );
};

export default HealthCheckEntryR;
