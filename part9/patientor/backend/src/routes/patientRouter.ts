import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import {
  RedactedPatient,
  Patient,
  NewPatient,
  NewPatientEntry,
} from "../types";
import { newEntryParser, newPatientParser } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<RedactedPatient[]>) => {
  res.send(patientService.getRedactedPatients());
});

router.get("/:id", (req, res: Response<Patient>) => {
  res.json(patientService.getPatient(req.params.id));
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

// NewPatientEntry taken from inferred type of discriminated union of schemas
router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewPatientEntry>,
    res: Response<Patient>
  ) => {
    const editedPatient = patientService.addEntry(req.body, req.params.id);
    res.json(editedPatient);
  }
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
