
using Saas.Shared.DataHandler;
using Saas.Shared.Options;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Sql options
builder.Services.Configure<SqlOptions>(
            builder.Configuration.GetRequiredSection(SqlOptions.SectionName));

builder.Services.AddScoped<IDatabaseHandler, DatabaseHandler>();

builder.Services.AddScoped<IUserGroup, UserGroupService>();

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

app.MapControllers();

app.Run();
