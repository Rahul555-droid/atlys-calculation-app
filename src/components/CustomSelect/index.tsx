import React, { useEffect, useState } from 'react'
// import './CustomSelect.css'

// text container with editable content
// popper component that will render options
// chips inside the text container

const options = [
  'apple',
  'brisk',
  'cloud',
  'dwarf',
  'eagle',
  'flame',
  'giant',
  'hover',
  'jolly',
  'knack',
  'lodge',
  'mirth',
  'nymph',
  'ocean',
  'petal',
  'quilt',
  'raven',
  'slope',
  'trick',
  'vivid'
].map((el) => ({ label: el, value: el }))

const Popper = (list: any) => {
  return <div></div>
}

function CustomSelect(props: any) {
  const [value, setValue] = useState<any[]>([])

  const handleChange = (value: string) => {
    console.log({ value })
    setValue((prev) => [...prev, value])
  }

  useEffect(() => {
    console.log({ value })
  }, [value])
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40vw',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '10px',
          border: '1px solid blue',
        }}
        className="select"
      >
        {options.map((el) => (
          <div
            key={el.value}
            style={{
              backgroundColor: 'lightgray',
              color: 'white',
              border: '1px solid gray',
              borderRadius: '2px',
              padding: '4px',
              gap:'5px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {' '}
            <div>
            {el.label}{' '}
            </div>
            <div style={{
              color:'black',

            }} > x </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect
