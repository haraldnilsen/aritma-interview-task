import React from "react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
      <form className="flex flex-col gap-4 justify-between">
        <div className="grid grid-flow-row gap-3 border-2 rounded-lg p-4">
          <input className="p-2" type="text" placeholder="Amount" />
          <input className="p-2" type="text" placeholder="Payback time" />
          <select className="p-2">
            <option>Housing loan</option>
          </select>
        </div>
        <button>Calculate</button>
      </form>
    </div>
  );
};

export default App;
