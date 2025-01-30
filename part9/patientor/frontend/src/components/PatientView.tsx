import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

import EntryList from "./EntryList";

import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const patientId = useParams().id;
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const patient = await patientService.getPatient(patientId);
        setPatient(patient);
      } else {
        throw new Error("no patient id found in params");
      }
    };
    void fetchPatient();
  }, [patientId]);

  const genderIconDict = {
    male: <MaleIcon />,
    female: <FemaleIcon />,
    other: <TransgenderIcon />,
  };

  return (
    <div>
      {patient ? (
        <div>
          <Typography
            variant="h4"
            style={{ paddingTop: ".5em", paddingBottom: ".5em" }}
          >
            {patient.name} {genderIconDict[patient.gender]}
          </Typography>

          <Typography variant="body1">
            DOB: {patient.dateOfBirth} <br />
            SSN: {patient.ssn} <br />
            Occupation: {patient.occupation}
          </Typography>
          <Typography
            variant="h5"
            style={{ paddingTop: ".5em", paddingBottom: ".5em" }}
          >
            Entries
          </Typography>
          <EntryList entries={patient.entries} />
        </div>
      ) : (
        <div>No patient found</div>
      )}
    </div>
  );
};

export default PatientView;
