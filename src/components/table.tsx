import { useState } from "react";
import SalesCard from "./SalesCard";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const tabsData = [
  {
    label: "Aeon",
  },
  {
    label: "Cashout",
  },
];

const SaleLists = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div className="flex items-end justify-center space-x-2 mb-4">

      </div>
      <div className="flex justify-center items-center">

        <div className="flex w-2/5 flex-row bg-white overflow-hidden rounded-sm border-b mb-2 justify-between">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`w-1/4 pb-2 px-1 text-center transition-colors duration-300 border-b-2 font-medium text-xs uppercase ${idx === activeTabIndex
                  ? "border-purple-500"
                  : "border-transparent hover:border-gray-200"
                  }`}
                // Change the active tab on click.
                onClick={() => setActiveTabIndex(idx)}>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {activeTabIndex === 0 &&
        (<>
          <SalesCard type="aeon" />
        </>
        )}
      {activeTabIndex === 1 &&
        (
          <>
            <SalesCard type="cashout" />
          </>
        )}
    </>
  )

}

export default SaleLists 