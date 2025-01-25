interface exerciseVals {
  targetAvgHrs: number;
  exerciseHrs: number[];
}

const parseArgs = (args: string[]): exerciseVals => {
  if (args.length < 3) throw new Error("Not enough arguments");

  args.slice(2).forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("no string values allowed, must all be numbers");
    }
  });

  return {
    targetAvgHrs: Number(process.argv[2]),
    exerciseHrs: process.argv.slice(3).map((num) => Number(num)),
  };
};

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  targetAvgHrs: number,
  exerciseHrs: number[]
): exerciseResult => {
  const periodLength = exerciseHrs.length;
  const trainingDays = exerciseHrs.reduce(
    (accum, hrs) => (hrs > 0 ? accum + 1 : accum),
    0
  );

  const average =
    exerciseHrs.reduce((accum, hrs) => hrs + accum, 0) / periodLength;

  const success = average >= targetAvgHrs;

  let rating: number;
  let ratingDescription: string;

  if (average >= targetAvgHrs) {
    rating = 3;
    ratingDescription = "Good job";
  } else if (average >= targetAvgHrs * 0.5) {
    rating = 2;
    ratingDescription = "Almost there";
  } else if (average >= 0) {
    rating = 1;
    ratingDescription = "Well, at least you tried";
  } else {
    throw new Error("Rating cannot be obtained");
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAvgHrs,
    average,
  };
};

try {
  const { targetAvgHrs, exerciseHrs } = parseArgs(process.argv);
  console.log(calculateExercises(targetAvgHrs, exerciseHrs));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
