import React from "react";
import { LoanPayment } from "../../types/Loan";

interface LoanTableProps {
  loanPayments: LoanPayment[];
}

const LoanTable: React.FC<LoanTableProps> = ({ loanPayments }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-bkg">
        <tr>
          {[
            "Month",
            "Principal Payment",
            "Interest Payment",
            "Total Payment",
            "Balance",
          ].map((item) => (
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-content uppercase tracking-wider"
              key={item}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loanPayments.map((payment) => (
          <tr key={payment.month}>
            <td className="px-6 py-4 whitespace-nowrap">{payment.month}</td>
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
  );
};

export default LoanTable;
