import express, { Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnoses!");
});

export default router;
