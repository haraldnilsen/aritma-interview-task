import React from "react";
import LoanCalculator from "./components/LoanCalculator";

const App: React.FC = () => {
  return (
    <div className="flex flex-col w-screen items-center text-center">
      <h1 className="my-6">Loan Calculator</h1>
      <LoanCalculator />
    </div>
  );
};

export default App;
