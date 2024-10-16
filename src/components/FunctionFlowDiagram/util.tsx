import { functionOrder } from "./constants";

// Helper function to validate equation (allow only +, -, *, /, ^ operators)
export const validateEquation = (equation: string): boolean => {
  const regex = /^[0-9x\+\-\*/\^() ]+$/;
  return regex.test(equation);
};

// Helper function to evaluate the equation
export const evaluateEquation = (equation: string, input: number): number => {
  try {
    // Add * where number is followed by x (e.g., 2x becomes 2*x)
    let correctedEquation = equation.replace(/(\d)(x)/g, "$1*$2");

    // Replace ^ with ** for exponentiation
    correctedEquation = correctedEquation.replace(/\^/g, '**');

    // Replace x with the input value
    const replacedEquation = correctedEquation.replace(/x/g, input.toString());

    // Safely evaluate the equation using eval
    const result = eval(replacedEquation);
    return result;
  } catch (error) {
    console.error("Error in equation:", equation);
    return input; // Return the current input if there's an error
  }
};


export const getNextIdAndCurrentIndex = (id: string) => {
  const index = functionOrder.indexOf(id)

  if (index < functionOrder.length - 1) {
    return {
      nextId: functionOrder[index + 1],
      currentIndex: index
    }
  }

  return {
    nextId: 0, // or whatever default value makes sense
    currentIndex: index
  }
}
