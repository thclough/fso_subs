import express from "express";
import calculateBmi from "./bmiCalculator";
import parseWebBMIVals from "./helpers";
const app = express();

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
    res.send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
