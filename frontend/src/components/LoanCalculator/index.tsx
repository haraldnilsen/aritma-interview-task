import React, { SyntheticEvent, useEffect, useState } from "react";
import "./styles.css";
import NumberInput from "../NumberInput";
import {
  LoanPayment,
  LoanPaymentResponse,
  LoanType,
  LoanTypeResponse,
} from "../../types/Loan";
import getLoanTypes from "../../api/getLoanTypes";
import getLoanPayments from "../../api/getLoanPayments";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [paybackTime, setPaybackTime] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(0);

  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [loanPayments, setLoanPayments] = useState<LoanPayment[]>([]);

  useEffect(() => {
    const fetchLoanTypes = async () => {
      let response: LoanTypeResponse = await getLoanTypes();

      if (response) {
        setLoanTypes(response.results);
        setInterestRate(response.results[0].interest);
      }
    };

    fetchLoanTypes();
  }, []);

  const onCalculateSubmit = async (
    amount: number,
    years: number,
    interest: number
  ) => {
    let response: LoanPaymentResponse = await getLoanPayments(
      amount,
      years,
      interest
    );

    if (response) {
      setLoanPayments(response.results);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          if (loanAmount && paybackTime && interestRate) {
            onCalculateSubmit(loanAmount, paybackTime, interestRate);
          }
        }}
        className="form grid grid-flow-row gap-3 border-2 border-gray-200 hover:border-gray-300 rounded-lg p-6 m-4"
      >
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
            onChange={(e) => setInterestRate(Number(e.target.value))}
          >
            {loanTypes.map((loantype, index) => (
              <option key={index} value={loantype.interest}>
                {loantype.name} ({loantype.interest} % interest)
              </option>
            ))}
          </select>
        )}
        <div className="w-full flex justify-around">
          <div
            onClick={() => {
              setLoanAmount(0);
              setPaybackTime(1);
            }}
            className="button my-2 border border-gray-500"
          >
            Clear
          </div>
          <button className="button my-2 border border-gray-500">
            Calculate
          </button>
        </div>
      </form>
      {/* {loanPayments && (
        <div className="border-2 border-gray-200 hover:border-gray-300 rounded-lg p-6 m-4">
          {loanPayments.map((payment) => (
            <div>
              <p>Month: {payment.month}</p>
              <p>Principal Payment: {payment.principalpayment}</p>
              <p>Interest Payment: {payment.interestpayment}</p>
              <p>Total Payment: {payment.totalpayment}</p>
              <p>Remaining Payment: {payment.remainingprincipal}</p>
            </div>
          ))}
        </div>
      )} */}
      {loanPayments && (
        <div className="border-2 border-gray-200 hover:border-gray-300 rounded-lg  m-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Month
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Principal Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Interest Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining Principal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loanPayments.map((payment) => (
                <tr key={payment.month}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.principalPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.interestPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.totalPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.remainingPrincipal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
