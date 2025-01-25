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

export default parseWebBMIVals;
