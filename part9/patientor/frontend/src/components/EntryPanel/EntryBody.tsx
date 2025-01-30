import { Entry } from "../../types";
import { useContext } from "react";
import BlendedContext from "../../context";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";

interface EntryBodyProps {
  entry: Entry;
  icon: () => JSX.Element;
}

const EntryBody = ({ entry, icon }: EntryBodyProps) => {
  const diagnoses = useContext(BlendedContext);
  return (
    <div>
      {icon()}
      <Typography>
        <b>{entry.date} </b> {entry.specialist} <br />
        <i>{entry.description}</i>
      </Typography>
      {entry.diagnosisCodes && (
        <div>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Diagnoses Received:
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diagnosisSearch = diagnoses.find(
                  (diagnosis) => diagnosis.code === code
                );

                const diagnosisText = diagnosisSearch
                  ? diagnosisSearch.name
                  : "No diagnosis description";

                return (
                  <li key={uuidv4()}>
                    {code} {diagnosisText}
                  </li>
                );
              })}
            </ul>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default EntryBody;
