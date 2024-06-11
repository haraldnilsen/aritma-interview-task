using Xunit;
using System.Collections.Generic;
using backend;

namespace LoanCalculator
{
    public class PaymentCalculatorTests
    {
        [Fact]
        public void CalculateCorrectPayment_With_Interest()
        {
            // Arrange
            decimal loanAmount = 10000m;
            int years = 1;
            decimal annualInterestRate = 12;
            int totalMonths = years * 12;

            // Act
            List<LoanPayment> result = PaymentCalculator.GenerateMonthlyPaybackPlan(loanAmount, years, annualInterestRate);

            // Assert
            Assert.Equal(totalMonths, result.Count);
            Assert.Equal(888.49m, result[0].TotalPayment);
            Assert.Equal(10000m, result[0].RemainingPrincipal + result[0].PrincipalPayment);
        }

        [Fact]
        public void CalculateCorrectPayment_WithOut_Interest()
        {
            // Arrange
            decimal loanAmount = 12000m;
            int years = 1;
            decimal annualInterestRate = 0m;
            int totalMonths = years * 12;

            // Act
            List<LoanPayment> result = PaymentCalculator.GenerateMonthlyPaybackPlan(loanAmount, years, annualInterestRate);

            // Assert
            Assert.Equal(totalMonths, result.Count);
            Assert.Equal(1000m, result[0].TotalPayment);
            Assert.Equal(1000m, result[0].PrincipalPayment);
            Assert.Equal(0m, result[0].InterestPayment);
        }
    }
}
