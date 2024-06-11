using Microsoft.AspNetCore.Mvc;

namespace backend;

[ApiController]
[Route("[controller]")]
public class LoanTypesController: ControllerBase
{
    private readonly LoanDbContext _context;
    private readonly ILogger<LoanTypesController> _logger;

    public LoanTypesController(ILogger<LoanTypesController> logger, LoanDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetLoans")]
    public ActionResult<IEnumerable<LoanType>> Get() {
    try
        {
            var loans = _context.LoanTypes.AsQueryable();

            LoanTypeResponse Response = new LoanTypeResponse("OK", loans);

            return Ok(Response);
        }
    catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching loans");
            return StatusCode(500, "Internal server error");
        }
    }
}