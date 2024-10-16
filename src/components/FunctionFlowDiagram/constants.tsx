// Type for the structure of each function's details
type FunctionDetails = {
  equation: string;
  isValid: boolean;
  nextFunction: string;
  input: number;
};

// Type for the defaultFunctions object
export type FunctionsMap = {
  [key: string]: FunctionDetails;
};

export interface Position {
  x: number | null;
  y: number | null;
}

export interface Connection {
  id: string;
  inputPos: Position;
  outputPos: Position;
}



export const functionOrder = ['f1', 'f2', 'f4', 'f5', 'f3',
  // 'f6'
]; // Fixed function order

export const defaultFunctions: FunctionsMap = {
  f1: { equation: 'x^2', isValid: true, nextFunction: 'Function 2', input: 0,  },
  f2: { equation: '2x+4', isValid: true, nextFunction: 'Function 4', input: 0,  },
  f3: { equation: 'x^2+20', isValid: true, nextFunction: '', input: 0,  },
  f4: { equation: 'x-2', isValid: true, nextFunction: 'Function 5', input: 0,  },
  f5: { equation: 'x/2', isValid: true, nextFunction: 'Function 3', input: 0,  },
  // f6: { equation: 'x-5', isValid: true, nextFunction: 'Function 6', input: 0,  },
};
