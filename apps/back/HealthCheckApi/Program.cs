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

app.MapControllers();

app.Run();
