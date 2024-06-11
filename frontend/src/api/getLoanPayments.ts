import { LoanPaymentResponse } from "../types/Loan";

export const getLoanPayments = async (
  amount: number,
  years: number,
  interest: number
): Promise<LoanPaymentResponse> => {
  const url = `https://localhost:7213/loanpayment?amount=${amount}&years=${years}&interest=${interest}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add additional headers here if required by the API
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default getLoanPayments;
