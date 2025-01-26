import express, { Response } from "express";
import patientService from "../services/patientService";
import { RedactedPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<RedactedPatient[]>) => {
  res.send(patientService.getRedactedPatients());
});

// router.post("/", (_req, _res) => {
//   return null;
// });

export default router;
