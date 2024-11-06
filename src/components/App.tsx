import FunctionFlowDiagram from './FunctionFlowDiagram'
import CustomSelect from './CustomSelect'

function App() {
  return (
    <>
      {/* <FunctionFlowDiagram /> */}
      {/* <Tabs />
      <TextArea1 /> */}
      <Dropdown />
    </>
  )
}

export default App

function Dropdown() {
  return (
    <div className="relative mt-10 w-56 mx-auto">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <a
          href="#"
          className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          Edit
        </a>

        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          {['View on Storefront', 'View Warehouse Info'].map((el) => (
            <a
              href={`#${el}`}
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              {el}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function Tabs() {
  return (
    <div className="mx-auto my-5 max-w-max">
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option selected>Notifications</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="flex gap-6" aria-label="Tabs">
          <a
            href="#"
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Settings
          </a>

          <a
            href="#"
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Messages
          </a>

          <a
            href="#"
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Archive
          </a>

          <a
            href="#"
            className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
            aria-current="page"
          >
            Notifications
          </a>
        </nav>
      </div>
    </div>
  )
}

function TextArea1() {
  return (
    <div className="mx-auto my-5 w-80">
      <label
        htmlFor="OrderNotes"
        className="block text-sm font-medium text-gray-700"
      >
        {' '}
        Order notes{' '}
      </label>

      <textarea
        id="OrderNotes"
        className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-2xl sm:text-sm focus:border-blue-400 border-2 outline-none p-3"
        rows={4}
        maxLength={50}
        placeholder="Enter any additional order notes..."
      ></textarea>
    </div>
  )
}
