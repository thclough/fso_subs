import express from "express";
import calculateBmi from "./bmiCalculator";
import { parseWebBMIVals, parseWebExerciseVals } from "./helpers";
import calculateExercises from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const newHeight = Number(height);
  const newWeight = Number(weight);

  try {
    const { parsedHeight, parsedWeight } = parseWebBMIVals(
      newHeight,
      newWeight
    );
    res.send({
      weight: parsedWeight,
      height: parsedHeight,
      bmi: calculateBmi(parsedHeight, parsedWeight),
    });
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    const { parsed_daily_exercises, parsed_target } = parseWebExerciseVals(
      daily_exercises,
      target
    );
    res.send(calculateExercises(parsed_target, parsed_daily_exercises));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
