import patients from "../../data/patients-full";
import {
  NewPatient,
  Patient,
  RedactedPatient,
  NewPatientEntry,
  Diagnosis,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patientOfInterest = patients.find((patient) => patient.id === id);
  if (patientOfInterest) {
    return patientOfInterest;
  } else {
    throw new Error("Patient not found");
  }
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

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    entries: [],
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const addEntry = (entry: NewPatientEntry, patientId: string): Patient => {
  const entryId = uuid();

  entry.diagnosisCodes = parseDiagnosisCodes(entry);

  const newEntry = {
    id: entryId,
    ...entry,
  };

  const patientBefore = getPatient(patientId);

  if (patientBefore) {
    Object.assign(patientBefore, {
      entries: patientBefore.entries.concat(newEntry),
    });
  } else {
    throw new Error("No patient found with id");
  }

  return getPatient(patientId);
};

export default {
  getPatients,
  getPatient,
  getRedactedPatients,
  addPatient,
  addEntry,
};
