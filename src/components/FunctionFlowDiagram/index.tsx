import React, { useCallback, useEffect, useRef, useState } from 'react'

import CustomChip from 'components/CustomChip'
import { getPosition } from 'utils'
import FlowLine from '../FlowLine'
import FunctionCard from '../FunctionCard'
import {
  Connection,
  defaultFunctions,
  functionOrder,
  FunctionsMap,
  Position
} from './constants'
import {
  evaluateEquation,
  getNextIdAndCurrentIndex,
  validateEquation
} from './util'

const FunctionFlowDiagram: React.FC = () => {
  const [functions, setFunctions] = useState<FunctionsMap>(defaultFunctions) // Typed as FunctionsMap
  const [initialInput, setInitialInput] = useState(2) // User input for the initial value
  const [finalOutput, setFinalOutput] = useState(0)
  const [connections, setConnections] = useState<Connection[]>([]) // Properly typed as an array of Connection

  const initialInputRef = useRef<HTMLDivElement | null>(null)
  const finalOutputRef = useRef<HTMLDivElement | null>(null)

  const handleConnect = (
    id: string,
    inputPos: Position,
    outputPos: Position
  ) => {
    setConnections((prevConnections: Connection[]) => {
      let newConnections = [...prevConnections];
      let currIdx = newConnections.findIndex(el => el.id === id);
      if(currIdx >= 0){
        newConnections[currIdx] = { id, inputPos, outputPos }
      }
      else{
        newConnections.push({ id, inputPos, outputPos} )
      }
      return newConnections;
    })
  }

  const getConnectionById = (id: string): Connection =>
    connections.find((el) => el.id === id) || {
      id,
      inputPos: { x: null, y: null },
      outputPos: { x: null, y: null }
    }

  const renderInitialAndFinalConnections = () => {
    const initialInputPos = getPosition(initialInputRef)
    const finalOutputPos = getPosition(finalOutputRef)

    const { inputPos: firstFunctionInputPos } = getConnectionById(
      functionOrder[0]
    )
    const { outputPos: lastFunctionOutputPos } = getConnectionById(
      functionOrder[functionOrder.length - 1]
    )

    const pathForInitial = {
      startX: initialInputPos.x,
      startY: initialInputPos.y,
      endX: firstFunctionInputPos.x,
      endY: firstFunctionInputPos.y
    }

    const pathForFinal = {
      startX: lastFunctionOutputPos.x,
      startY: lastFunctionOutputPos.y,
      endX: finalOutputPos.x,
      endY: finalOutputPos.y
    }
    return (
      <>
        <FlowLine {...pathForInitial} />
        <FlowLine {...pathForFinal} />
      </>
    )
  }

  const renderConnections = () => {
    return connections.map(
      (
        { id, outputPos }: { id: string; inputPos: any; outputPos: any },
        index: number
      ) => {
        const { nextId } = getNextIdAndCurrentIndex(id)
        const { inputPos: nextInputPos } = getConnectionById(String(nextId))

        const [startX, startY] = [outputPos.x, outputPos.y]
        const [endX, endY] = [nextInputPos.x, nextInputPos.y]

        return <FlowLine {...{ startX, startY, endX, endY }} key={id} />
      }
    )
  }

  // Handle equation change and revalidate
  const handleEquationChange = (
    id: string,
    input: number,
    newEquation: string
  ) => {
    const isValid = validateEquation(newEquation)
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      [id]: { ...prevFunctions[id], equation: newEquation, isValid }
    }))
    if (isValid) {
      updateFunctionOutputForIdsInChain(id, input, newEquation)
    }
  }

  // Update function outputs based on the current input value
  const updateFunctionOutputForIdsInChain = (
    id: string,
    input: number,
    equation: string | undefined
  ) => {
    const index = functionOrder.indexOf(id)
    const calculatedOutput = evaluateEquation(
      typeof equation === 'string' ? equation : functions[id].equation,
      input
    )
    if (index < functionOrder.length - 1) {
      const nextId = functionOrder[index + 1]
      setFunctions((prevFunctions) => ({
        ...prevFunctions,
        [nextId]: { ...prevFunctions[nextId], input: calculatedOutput } // Update output for the current function
      }))
      updateFunctionOutputForIdsInChain(
        nextId,
        calculatedOutput,
        functions[nextId]?.equation
      ) // Recursively update the next function's input
    } else {
      setFinalOutput(calculatedOutput)
    }
  }

  //Recalculate outputs when the initial input changes or when component is mounted.
  useEffect(() => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      [functionOrder?.[0]]: {
        ...prevFunctions[functionOrder?.[0]],
        input: initialInput
      } // Update output for the current function
    }))
    updateFunctionOutputForIdsInChain(
      functionOrder?.[0],
      initialInput,
      undefined
    )
  }, [initialInput])

  const getOutput = useCallback(
    (id: string) => {
      return getNextIdAndCurrentIndex(id)?.nextId
        ? functions[getNextIdAndCurrentIndex(id)?.nextId].input
        : finalOutput
    },
    [functions, finalOutput]
  )

  return (
    <div className="p-8">
      {/* Input field for initial value */}
      <div className="flex flex-col items-center">
        <div className="space-y-20">
          <div className="flex justify-center items-center">
            <div className="w-[220px]">
              <CustomChip text="Initial Value of x" className="bg-yellow-500" />
              <div ref={initialInputRef} className="mt-2">
                <input
                  type="number"
                  value={initialInput}
                  onChange={(e) => setInitialInput(Number(e.target.value))}
                  className="w-[115px] h-[50px] border-2 border-yellow-500 bg-white rounded-[15px] p-2" // Updated border color
                />
              </div>
            </div>

            {/* Flexbox layout with max 3 cards per row */}
            <div className="flex flex-wrap justify-center gap-16">
              {Object.entries(functions).map(([id, elem], index) => (
                <div
                  key={id}
                  className="max-w-[30%]" // Each card can take max 30% width for 3 cards per row
                >
                  <FunctionCard
                    id={id}
                    equation={elem.equation}
                    isValid={elem.isValid}
                    nextFunction={elem.nextFunction}
                    input={elem.input}
                    output={getOutput(id)}
                    onEquationChange={handleEquationChange}
                    onConnect={handleConnect}
                  />
                </div>
              ))}
            </div>

            <div className="w-[220px]">
              <CustomChip text="Final output (y)" className="bg-green-500" />
              <div ref={finalOutputRef} className="mt-2">
                <input
                  type="number"
                  value={finalOutput}
                  className="w-[160px] h-[50px] border-2 border-green-500 bg-white rounded-[15px] p-2" // Updated border color
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG lines to connect the function cards */}

      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none', zIndex: 3 }}
        width="100%"
        height="100%"
      >
        {renderConnections()}
        {renderInitialAndFinalConnections()}
      </svg>
    </div>
  )
}

export default FunctionFlowDiagram
