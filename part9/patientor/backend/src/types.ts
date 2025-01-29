import { newEntrySchema } from "./utils";
import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type RedactedPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof newEntrySchema>;
