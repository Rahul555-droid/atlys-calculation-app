# Function Chain Calculator App

This application is a web-based tool that allows users to input a chain of mathematical functions, calculate the result by applying those functions in sequence, and visualize the flow of the calculation.

## Features
- **Function Chain:** The app consists of 5 mathematical function cards, each taking the output of the previous function as its input.
- **Custom Equations:** Users can modify the equations using basic arithmetic operators (addition, subtraction, multiplication, division) and exponents.
- **Chaining UI:** Functions are represented by cards that are visually connected, displaying the fixed order of execution (1 → 2 → 4 → 5 → 3).
- **Real-time Calculation:** As users change the initial input or modify the function equations, the result updates automatically.
- **Validation:** The app ensures that only valid arithmetic expressions are entered for the function equations.
- **New functions can be added** by simply adding it in the constants file at src\components\FunctionFlowDiagram\constants . I have added a commented function 6 for example in code
- **Optimized calculations** if an equation is changed only the next in chain outputs are recalculated and not the whole chain before the current equation change.

## Tech Stack
- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **SVG** for connecting lines between function cards
- No external libraries used for the flow representation

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone github.com/Rahul555-droid/atlys-calculation-app.git
   cd atlys-calculation-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build the project:**

   ```bash
   npm run build
   ```

5. **Deploy the application:**  
   You can deploy the build using platforms like Vercel, Netlify, or GitHub Pages.

## Deployment
A live version of the application can be found [here](https://atlys-calculation-app.vercel.app/).


