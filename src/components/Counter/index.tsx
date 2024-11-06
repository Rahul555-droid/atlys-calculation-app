import React from 'react'

function Counter() {
  const [count, setCount] = React.useState(0)
  const handleIncreaseClick = (e: any) => {
    e.preventDefault() // Prevent form submission
    setCount((prev) => prev + 1)
  }
  return (
    <div>
      <button onClick={handleIncreaseClick}>Clicks: {count}</button>
    </div>
  )
}

export default Counter
