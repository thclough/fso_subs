import { Gender, HealthCheckRating } from "./types";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const newHealthCheckEntrySchema = newBaseEntrySchema
  .extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
  })
  .strict();

const newOccupationalHealthcareEntrySchema = newBaseEntrySchema
  .extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z
      .object({ startDate: z.string().date(), endDate: z.string().date() })
      .optional(),
  })
  .strict();

const newHospitalEntrySchema = newBaseEntrySchema
  .extend({
    type: z.literal("Hospital"),
    discharge: z
      .object({ date: z.string().date(), criteria: z.string() })
      .optional(),
  })
  .strict();

const newPatientEntrySchema = z.discriminatedUnion("type", [
  newHealthCheckEntrySchema,
  newOccupationalHealthcareEntrySchema,
  newHospitalEntrySchema,
]);

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export {
  newPatientSchema,
  newPatientParser,
  newHealthCheckEntrySchema,
  newOccupationalHealthcareEntrySchema,
  newHospitalEntrySchema,
  newPatientEntrySchema,
  newEntryParser,
};
