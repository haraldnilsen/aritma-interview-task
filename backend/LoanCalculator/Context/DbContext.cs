using LoanCalculator.Models;
using Microsoft.EntityFrameworkCore;

public class LoanDbContext: DbContext
{
    public LoanDbContext(DbContextOptions<LoanDbContext> options) : base(options)
    {
    }

    public DbSet<LoanType> LoanTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoanType>().HasKey(lt => lt.Id);
        modelBuilder.Entity<LoanType>().Property(lt => lt.Id).ValueGeneratedOnAdd();
    }
}