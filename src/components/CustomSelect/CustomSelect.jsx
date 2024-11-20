//accordion
//infinite scroll with virtualization
//file explorer

import React, { useEffect, useMemo, useState , useRef } from 'react'

const options = Array.from({ length: 200 }, (_, index) => `option ${index + 1}`)

function CustomSelect() {
  const [search, setSearch] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [focusedIndex, setFocusedIndex] = useState(0) // For arrow navigation

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (el) =>
          el.toLowerCase().includes(search.toLowerCase()) &&
          !selectedOptions.includes(el)
      ),
    [search, selectedOptions]
  )

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.custom-select')) {
        setShowOptions(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleOptionClick = (option) => {
    setSelectedOptions((prev) => [...prev, option])
    setSearch('')
    // setShowOptions(false);
  }

  const handleSelectedOptionClick = (option) => {
    setSelectedOptions((prev) => prev.filter((o) => o !== option))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setShowOptions(true)
      setFocusedIndex((prev) => (prev + 1) % filteredOptions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setShowOptions(true)
      setFocusedIndex(
        (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
      )
    } else if (e.key === 'Enter' && filteredOptions[focusedIndex]) {
      e.preventDefault()
      setShowOptions(false)
      handleOptionClick(filteredOptions[focusedIndex])
    }
  }

  return (
    <div className="custom-select relative mt-10 w-96 mx-auto">
      {/* Input with Buttons */}
      <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 focus-within:ring focus-within:ring-blue-300">
        {/* Selected Options */}
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <button
              key={option}
              className="text-white bg-blue-500 hover:bg-blue-400 text-sm rounded-sm px-2 py-1"
              onClick={() => handleSelectedOptionClick(option)}
            >
              {option} ×
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          className="px-2 py-1 text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowOptions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search or add options..."
        />
      </div>

      {/* Dropdown Options */}
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              className={`p-2 cursor-pointer ${
                index === focusedIndex ? 'bg-blue-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const InfiniteScroll = () => {
  const [items, setItems] = useState([]) // Store list items
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const containerRef = useRef(null)



  // Mock API call to fetch more items
  const fetchMoreItems = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = Array.from(
          { length: 20 },
          (_, i) => `Item ${items.length + i + 1}`
        )
        resolve(newItems)
      }, 1200) // Simulate network delay
    })
  }

  const loadMore = async () => {
    setIsLoading(true)
    const newItems = await fetchMoreItems()
    setItems((prev) => [...prev, ...newItems])
    setIsLoading(false)
  }

  // Detect when bottom is reached
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
        loadMore()
      }
    }
  }

  useEffect(() => {
    // Load initial items
    loadMore()
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[500px] overflow-auto border rounded shadow-md"
      onScroll={handleScroll}
    >
      <ul className="p-4 space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow rounded hover:bg-gray-100 transition"
          >
            {item}
          </li>
        ))}
      </ul>

      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      )}
    </div>
  )
}

export const VirtualizedList = () => {
  const totalItems = 10000; // Total number of items
  const itemHeight = 50; // Height of each item (in pixels)
  const viewportHeight = 500; // Height of the viewport
  const buffer = 5; // Number of extra items to render above and below the viewport

  const [startIndex, setStartIndex] = useState(0); // Index of the first visible item
  const [endIndex, setEndIndex] = useState(0); // Index of the last visible item

  const viewportRef = useRef(null); // Ref for the scrollable container

  useEffect(() => {
    // Initial calculation of visible items
    calculateVisibleItems();
  }, []);

  const calculateVisibleItems = () => {
    if (viewportRef.current) {
      const scrollTop = viewportRef.current.scrollTop;
      const startIdx = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(viewportHeight / itemHeight);
      setStartIndex(Math.max(0, startIdx - buffer));
      setEndIndex(Math.min(totalItems - 1, startIdx + visibleCount + buffer));
    }
  };

  const handleScroll = () => {
    calculateVisibleItems();
  };

  // Generate the list of items
  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  return (
    <div
      ref={viewportRef}
      className="h-[500px] overflow-auto border rounded"
      onScroll={handleScroll}
    >
      {/* Inner container */}
      <div
        style={{
          height: `${totalItems * itemHeight}px`, // Total height of the list
          position: "relative",
        }}
      >
        {items.slice(startIndex, endIndex + 1).map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * itemHeight}px`,
              height: `${itemHeight}px`,
              width: "100%",
            }}
            className="bg-white border-b flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect
