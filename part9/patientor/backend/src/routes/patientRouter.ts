import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { RedactedPatient, Patient, NewPatient } from "../types";
import { newPatientParser } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<RedactedPatient[]>) => {
  res.send(patientService.getRedactedPatients());
});

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

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
