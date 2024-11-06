import React, { useRef, useEffect, useState } from 'react'
import { getPosition } from 'utils'
import { Position } from 'components/FunctionFlowDiagram/constants'

interface FunctionCardProps {
  id: string
  equation: string
  isValid: boolean
  nextFunction: string
  input: number
  output: number
  onEquationChange: (id: string, input: number, newEquation: string) => void
  onConnect: (id: string, inputPos: Position, outputPos: Position) => void
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  id,
  equation,
  isValid,
  nextFunction,
  input,
  output,
  onEquationChange,
  onConnect
}) => {
  const inputRef = useRef<HTMLDivElement | null>(null)
  const outputRef = useRef<HTMLDivElement | null>(null)
  const calledOnce = useRef<Boolean>(false)

  useEffect(() => {
    const updatePositions = () => {
      if (onConnect) {
        // Get positions and send them to the parent for connection
        const inputPos = getPosition(inputRef)
        const outputPos = getPosition(outputRef)
        onConnect(id, inputPos, outputPos)
      }
    };

    // Call it once initially
    if (!calledOnce.current && id ){
      updatePositions();
      calledOnce.current = true;
    }

    // Add event listener for window resize
    window.addEventListener('resize', updatePositions);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, [onConnect, id]);


  //This is for a particular function // This console is for checking output and not a mistake
  console.log({id , equation , input , output})

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white w-60 relative">
      <div className="mb-2 flex justify-start gap-2">
        <div className="flex flex-col justify-center">
          <img src={`/three_dots.svg`} alt="Example" />
          <img className="mt-1" src={`/three_dots.svg`} alt="Example" />
        </div>
        <h3 className="text-sm font-semibold text-[#A5A5A5]">
          Function {id.slice(1)}
        </h3>
      </div>

      <div className="mb-8">
        <label className="mt-1 mb-1 block text-xs font-medium text-[#252525]">
          Equation
        </label>
        <input
          type="text"
          value={equation}
          onChange={(e) => onEquationChange(id, input, e.target.value)}
          className={`border p-1 w-full rounded text-sm h-8 ${
            !isValid ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {!isValid && (
          <p className="text-xs text-red-500 mt-1">Invalid equation</p>
        )}
      </div>

      <div className="mt-4">
        <label className="mt-1 mb-1 block text-xs font-medium text-gray-600">
          Next Function
        </label>
        <select
          className="w-full p-1 rounded bg-[#F5F5F5] border border-[#D3D3D3] text-[#D3D3D3] cursor-not-allowed text-sm h-8"
          value={nextFunction}
          disabled
        >
          <option>{nextFunction}</option>
        </select>
      </div>

      {/* These two elements for Input and Output connections */}
      <div className="flex justify-between items-center mb-2 mt-8">
        <div className="flex items-center">
          <div
            className="w-4 h-4 bg-gray-300 rounded-full"
            ref={inputRef}
          ></div>
          <span className="text-xs ml-2">input</span>
        </div>
        <div className="right-0 flex items-center">
          <span className="text-xs mr-2">output</span>
          <div
            className="w-4 h-4 bg-gray-300 rounded-full"
            ref={outputRef}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default FunctionCard
