import React, { useEffect, useState } from "react";
import "./styles.css";
import NumberInput from "../NumberInput";
import { LoanType, LoanTypeResponse } from "../../types/Loan";
import getLoanTypes from "../../api/getLoanTypes";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [paybackTime, setPaybackTime] = useState<number>(1);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);

  useEffect(() => {
    const fetchLoanTypes = async () => {
      let response: LoanTypeResponse = await getLoanTypes();

      if (response) {
        setLoanTypes(response.results);
      }
    };

    fetchLoanTypes();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <form className="form grid grid-flow-row gap-3 border-2 border-gray-200 hover:border-gray-300 rounded-lg p-6 m-4">
        <NumberInput
          id="loanamount"
          label="Loan Amount (NOK)"
          value={loanAmount}
          onChange={setLoanAmount}
        />
        <NumberInput
          id="paybacktime"
          label="Payback Time (years)"
          value={paybackTime}
          onChange={setPaybackTime}
        />
        <label htmlFor="loantype">Loan type</label>
        {loanTypes && (
          <select
            id="loantype"
            className="border border-gray-300 hover:border-gray-400 rounded-md px-3 py-2"
          >
            {loanTypes.map((loantype) => (
              <option>
                {loantype.name} ({loantype.interestRate} % interest)
              </option>
            ))}
          </select>
        )}
        <div className="w-full flex justify-around">
          <button className="my-2 border border-gray-500">Clear</button>
          <button className="my-2 border border-gray-500">Calculate</button>
        </div>
      </form>
    </div>
  );
};

export default LoanCalculator;
