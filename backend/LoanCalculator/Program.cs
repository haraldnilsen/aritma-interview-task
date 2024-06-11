using Microsoft.EntityFrameworkCore;
using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                      });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration; 

builder.Services.AddDbContext<LoanDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

var services = builder.Services.BuildServiceProvider();

using (var scope = services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<LoanDbContext>();
    context.Database.EnsureDeleted();
    context.Database.Migrate();

    if (!context.LoanTypes.Any()) {
        using (var reader = new StreamReader("public/DbMockData.csv"))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            TrimOptions = TrimOptions.Trim, // This line trims whitespace from headers
        }))
        {
            var records = csv.GetRecords<LoanType>().ToList();
            context.LoanTypes.AddRange(records);
            context.SaveChanges();
        }
    }
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
