import { useParams } from "react-router-dom";
import { NewEntry, Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import axios from "axios";

import EntryList from "./EntryList";
import AddEntryModal from "./AddEntryModal";

import { Typography, Button } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientView = () => {
  // Hooks
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
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

  // Functions

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      console.log("entered here", values);
      if (patientId) {
        const editedPatient = await patientService.addEntry(values, patientId);
        setPatient(editedPatient);
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          // const message = e.response.data.replace(
          //   "Something went wrong. Error: ",
          //   ""
          // );
          console.error(e.response.data);
          setError(e.response.data);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
          <AddEntryModal
            onClose={closeModal}
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </div>
      ) : (
        <div>No patient found</div>
      )}
    </div>
  );
};

export default PatientView;
