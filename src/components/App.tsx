import FunctionFlowDiagram from './FunctionFlowDiagram'
import CustomSelect from './CustomSelect/CustomSelect'
import { InfiniteScroll , VirtualizedList } from './CustomSelect/CustomSelect'

function App() {
  return (
    <>
    <CustomSelect />
    <div className='mt-5 mb-5' />
    <InfiniteScroll />
    <div className='mt-5 mb-5' />
    <VirtualizedList />
    {/* <FunctionFlowDiagram /> */}
    </>
  )
}

export default App
