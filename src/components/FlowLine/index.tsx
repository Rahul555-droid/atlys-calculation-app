import React from 'react'

interface FlowLineProps {
  startX: number | null
  startY: number | null
  endX: number | null
  endY: number | null
}

const FlowLine: React.FC<FlowLineProps> = ({ startX, startY, endX, endY }) => {
  // Calculate control points for the curve
  const typeSafeStartX = parseFloat(String(startX))
  const typeSafeStartY = parseFloat(String(startY))
  const typeSafeEndX = parseFloat(String(endX))
  const typeSafeEndY = parseFloat(String(endY))
  const controlPointX = (typeSafeStartX + parseFloat(String(endX))) / 2
  const controlPointY = parseFloat(String(endY)) - 50 // Adjust control point for smoothness

  return (
    <>
      {/* Circle at the start point */}
      <circle
        cx={typeSafeStartX}
        cy={typeSafeStartY}
        r="4"
        fill="#0066FF"
      />{' '}

      {/* Path for the curve */}
      <path
        d={`M${startX},${startY} Q${controlPointX},${controlPointY} ${endX},${endY}`}
        stroke="#0066FF4D" // Curve color
        strokeWidth="5"
        fill="transparent"
      />
      {/* Circle at the end point */}
      <circle cx={typeSafeEndX} cy={typeSafeEndY} r="4" fill="#0066FF" />{' '}
    </>
  )
}

export default FlowLine
