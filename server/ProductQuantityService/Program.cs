using Microsoft.Extensions.Configuration;
using ProductQuantityService.Helpers;
using ProductQuantityService.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("WebApiDatabase");

builder.Services.AddGrpc();
builder.Services.AddNpgsql<DataContext>(connectionString);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<ProductQuantitySvc>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
