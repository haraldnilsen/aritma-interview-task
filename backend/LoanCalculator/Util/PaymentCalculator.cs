using LoanCalculator.Models;

namespace LoanCalculator;

public static class PaymentCalculator 
{
    public static List<LoanPayment> GenerateMonthlyPaybackPlan(decimal loanAmount, int years, decimal annualInterestRate)
    {
        var monthlyPlan = new List<LoanPayment>();
        int totalMonths = years * 12;
        decimal monthlyInterestRate = annualInterestRate / 12 / 100;

        decimal monthlyPayment = CalculateMonthlyAmortizationPayment(monthlyInterestRate, loanAmount, totalMonths);
        decimal remainingPrincipal = loanAmount;

        for (int month = 1; month <= totalMonths; month++)
        {
            decimal interestPayment = remainingPrincipal * monthlyInterestRate;
            decimal principalPayment = monthlyPayment - interestPayment;
            decimal totalPayment = monthlyPayment;

            // Round values before adding to the list
            interestPayment = Math.Round(interestPayment, 2);
            principalPayment = Math.Round(principalPayment, 2);
            totalPayment = Math.Round(totalPayment, 2);
            remainingPrincipal = Math.Round(remainingPrincipal, 2);

            monthlyPlan.Add(new LoanPayment
            {
                Month = month,
                PrincipalPayment = principalPayment,
                InterestPayment = interestPayment,
                TotalPayment = totalPayment,
                RemainingPrincipal = remainingPrincipal
            });

            remainingPrincipal -= principalPayment;
        }

        return monthlyPlan;
    }


    public static decimal CalculateMonthlyAmortizationPayment(decimal monthlyInterestRate, decimal loanAmount, int totalMonths)
    {
        if (monthlyInterestRate == 0)
        {
            // If the interest rate is zero, the payment is just the loan amount divided by the number of months
            return Math.Round(loanAmount / totalMonths, 2);
        }

        // Calculate the monthly payment using the amortization formula
        decimal monthlyPayment = loanAmount * monthlyInterestRate * 
                                 (decimal)Math.Pow((double)(1 + monthlyInterestRate), totalMonths) / 
                                 ((decimal)Math.Pow((double)(1 + monthlyInterestRate), totalMonths) - 1);
        
        return Math.Round(monthlyPayment, 2);
    }
}