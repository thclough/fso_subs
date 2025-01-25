interface MultiplyValues {
  parsedHeight: number;
  parsedWeight: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (
    !isNaN(Number(args[2])) &&
    !isNaN(Number(args[3])) &&
    Number(args[2]) > 0 &&
    Number(args[3]) > 0
  ) {
    return {
      parsedHeight: Number(args[2]),
      parsedWeight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not Numbers or negative!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

if (require.main === module) {
  try {
    const { parsedHeight, parsedWeight } = parseArguments(process.argv);
    console.log(calculateBmi(parsedHeight, parsedWeight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
