using LoanCalculator.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoanCalculator.Controllers;
using static LoanCalculator.PaymentCalculator;

[ApiController]
[Route("[controller]")]
public class LoanPaymentController: ControllerBase
{
    private readonly LoanDbContext _context;
    private readonly ILogger<LoanPaymentController> _logger;

    public LoanPaymentController(ILogger<LoanPaymentController> logger, LoanDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetLoanPayments")]
    public ActionResult<IEnumerable<LoanPayment>> Get(
        [FromQuery] decimal amount,
        [FromQuery] int years,
        [FromQuery] decimal interest
    ) {
    try
        {
            var payments = GenerateMonthlyPaybackPlan(amount, years, interest);

            LoanPaymentResponse Response = new LoanPaymentResponse("OK", payments);

            return Ok(Response);
        }
    catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching loans");
            return StatusCode(500, "Internal server error");
        }
    }
}