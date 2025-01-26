import patients from "../../data/patients";
import { Patient, RedactedPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getRedactedPatients = (): RedactedPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getRedactedPatients,
};
