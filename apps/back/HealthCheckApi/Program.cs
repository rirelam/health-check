global using HealthCheckApi.HealthServices;

var builder = WebApplication.CreateBuilder(args);
var corsUrl = builder.Configuration.GetValue<string>("CorsUrl");

string corsPolicy = "defaultPolicy";

// Add services to the container.
builder.Services.AddCors(options =>
{
  options.AddPolicy(corsPolicy,
  builder =>
  {
    builder.WithOrigins(corsUrl)
      .AllowAnyHeader()
      .AllowAnyMethod();
  });
});

builder.Services.AddHealthChecks()
  .AddCheck("ICMP_01",
    new ICMPHealthCheck("www.ryadel.com", 150))
  .AddCheck("ICMP_02",
    new ICMPHealthCheck("www.google.com", 150))
  .AddCheck("ICMP_03",
    new ICMPHealthCheck($"www.{Guid.NewGuid():N}.com", 100));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(corsPolicy);

app.UseHealthChecks(new PathString("/api/health"),
      new CustomHealthCheckOptions());

app.MapControllers();

app.Run();
