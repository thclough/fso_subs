import EntryPanel from "./EntryPanel";
import { Entry } from "../types";
import { Stack } from "@mui/material";
import { Paper, Box } from "@mui/material";

const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <div>
      <Stack spacing={2}>
        {entries.map((entry) => (
          <Paper key={entry.id} elevation={3}>
            <Box p={2}>
              <EntryPanel entry={entry} />
            </Box>
          </Paper>
        ))}
      </Stack>
    </div>
  );
};

export default EntryList;
