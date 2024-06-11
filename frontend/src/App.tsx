import React from "react";
import LoanCalculator from "./components/LoanCalculator";

const App: React.FC = () => {
  return (
    <div className="flex bg-content flex-col w-screen items-center">
      <header className="header py-16">
        <h1 className="text-bkg mb-6 font-medium">Loan Calculator</h1>
        <h2 className="text-secondary font-semibold">
          Calculate how much you rent will cost you. Input the amount, payback
          time and which type of loan you have.
        </h2>
      </header>
      <LoanCalculator />
    </div>
  );
};

export default App;
