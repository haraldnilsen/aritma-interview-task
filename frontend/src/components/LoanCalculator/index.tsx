import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
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
import ResetSVG from "../../assets/svgs/ResetSVG";
import FormButton from "../FormButton";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [paybackTime, setPaybackTime] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(0);

  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [loanPayments, setLoanPayments] = useState<LoanPayment[]>([]);

  const loanPaymentsRef = useRef<HTMLDivElement>(null);

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

      await new Promise((r) => setTimeout(r, 200));

      const loanPaymentsNode = loanPaymentsRef.current;

      loanPaymentsNode?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div className="w-full bg-bkg flex flex-col items-center text-left">
      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          if (loanAmount && paybackTime && interestRate) {
            onCalculateSubmit(loanAmount, paybackTime, interestRate);
          }
        }}
        className="form relative bg-content text-secondary font-medium grid grid-flow-row gap-5 rounded-xl pb-7 pt-9 px-6 my-12"
      >
        <div
          onClick={() => {
            setLoanAmount(0);
            setPaybackTime(1);
            setLoanPayments([]);
          }}
          className="absolute right-8 top-5 hover:cursor-pointer hover:animate-spin360"
        >
          <ResetSVG width={30} fill="secondary" />
        </div>
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
            className="border text-content border-gray-300 hover:border-secondary rounded-md px-3 py-2"
            onChange={(e) => setInterestRate(Number(e.target.value))}
          >
            {loanTypes.map((loantype, index) => (
              <option key={index} value={loantype.interest}>
                {loantype.name} ({loantype.interest} % interest)
              </option>
            ))}
          </select>
        )}
        <div className="w-full flex justify-center my-5">
          <FormButton label="Calculate" />
        </div>
      </form>
      {loanPayments.length > 0 && (
        <div
          ref={loanPaymentsRef}
          className="border-2 border-gray-200 hover:border-gray-300 rounded-lg  m-4"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-bkg">
              <tr>
                {[
                  "Month",
                  "Principal Payment",
                  "Interest Payment",
                  "Total Payment",
                  "Remaining Principal",
                ].map((item) => (
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-content uppercase tracking-wider"
                  >
                    {item}
                  </th>
                ))}
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
