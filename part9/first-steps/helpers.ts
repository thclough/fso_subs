interface parsedWebBMIVals {
  parsedHeight: number;
  parsedWeight: number;
}

const parseWebBMIVals = (height: number, weight: number): parsedWebBMIVals => {
  if (!isNaN(weight) && !isNaN(height)) {
    return {
      parsedHeight: height,
      parsedWeight: weight,
    };
  } else {
    throw new Error("Provided values not numbers or missing");
  }
};

interface parsedExerciseVals {
  parsed_daily_exercises: number[];
  parsed_target: number;
}

const parseWebExerciseVals = (
  daily_exercises: unknown,
  target: unknown
): parsedExerciseVals => {
  if (daily_exercises === undefined || daily_exercises === undefined) {
    throw new Error("Parameters missing");
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    throw new Error("malformatted parameters");
  }

  daily_exercises.forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("malformatted parameters");
    }
  });

  return {
    parsed_daily_exercises: daily_exercises.map((raw) => Number(raw)),
    parsed_target: Number(target),
  };
};

export { parseWebBMIVals, parseWebExerciseVals };
