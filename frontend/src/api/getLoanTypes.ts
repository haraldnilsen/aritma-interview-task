import { LoanTypeResponse } from "../types/Loan";

export const getLoanTypes = async (): Promise<LoanTypeResponse> => {
  const url = `https://localhost:7213/loan`;

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

export default getLoanTypes;
