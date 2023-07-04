
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Services;
using Azure.Identity;
using System.Reflection;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;
using Saas.Shared.Options;
using Saas.Identity.Services;
using Saas.Shared.DataHandler;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApplicationInsightsTelemetry();
string projectName = Assembly.GetCallingAssembly().GetName().Name
    ?? throw new NullReferenceException("Project name cannot be null.");

var version = builder.Configuration.GetRequiredSection("Version")?.Value
        ?? throw new NullReferenceException("The Version value cannot be found. Has the 'Version' environment variable been set correctly for the Web App?");

var logger = LoggerFactory.Create(config => config.AddConsole()).CreateLogger(projectName);
logger.LogInformation("Debug edition: 001");
logger.LogInformation("Version: {version}", version);

if (builder.Environment.IsDevelopment())
{
    InitializeDevEnvironment();
}
else
{
    InitializeProdEnvironment();
}
// Add the user details that come back from B2C


//Add database handler. To directly query and a database using stored procedures or direct queries
builder.Services.AddScoped<IDatabaseHandler, DatabaseHandler>();

//Add custom tenant service handler
builder.Services.AddScoped<ICustomTenantService, CustomTenantService>();

builder.Services.Configure<AzureB2CSignupAdminOptions>(
        builder.Configuration.GetRequiredSection(AzureB2CSignupAdminOptions.SectionName));




//Sql options
builder.Services.Configure<SqlOptions>(
            builder.Configuration.GetRequiredSection(SqlOptions.SectionName));
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<ISecurityGroup, SecurityGroupService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.MapControllers();
app.Run();
void InitializeDevEnvironment()
{
    // IMPORTANT
    // The current version.
    // Must corresspond exactly to the version string of our deployment as specificed in the deployment config.json.

    logger.LogInformation($"Is Development.");

    // For local development, use the Secret Manager feature of .NET to store a connection string
    // and likewise for storing a secret for the permission-api app. 
    // https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows

    var appConfigurationconnectionString = builder.Configuration.GetConnectionString("AppConfig")
        ?? throw new NullReferenceException("App config missing.");

    // Use the connection string to access Azure App Configuration to get access to app settings stored there.
    // To gain access to Azure Key Vault use 'Azure Cli: az login' to log into Azure.
    // This login on will also now provide valid access tokens to the local development environment.
    // For more details and the option to chain and combine multiple credential options with `ChainedTokenCredential`
    // please see: https://learn.microsoft.com/en-us/dotnet/api/overview/azure/identity-readme?view=azure-dotnet#define-a-custom-authentication-flow-with-chainedtokencredential

    AzureCliCredential credential = new();

    builder.Configuration.AddAzureAppConfiguration(options =>
            options.Connect(appConfigurationconnectionString)
                .ConfigureKeyVault(kv => kv.SetCredential(credential))
            .Select(KeyFilter.Any, version)); // <-- Important: since we're using labels in our Azure App Configuration store

    logger.LogInformation($"Initialization complete.");

    builder.Services.AddSwaggerGen();
}

void InitializeProdEnvironment()
{
    // For procution environment, we'll configured Managed Identities for managing access Azure App Services
    // and Key Vault. The Azure App Services endpoint is stored in an environment variable for the web app.

    logger.LogInformation($"Is Production.");

    var appConfigurationEndpoint = builder.Configuration.GetRequiredSection("AppConfiguration:Endpoint")?.Value
        ?? throw new NullReferenceException("The Azure App Configuration Endpoint cannot be found. Has the endpoint environment variable been set correctly for the Web App?");

    // Get the ClientId of the UserAssignedIdentity
    // If we don't set this ClientID in the ManagedIdentityCredential constructor, it doesn't know it should use the user assigned managed id.
    var managedIdentityClientId = builder.Configuration.GetRequiredSection("UserAssignedManagedIdentityClientId")?.Value
        ?? throw new NullReferenceException("The Environment Variable 'UserAssignedManagedIdentityClientId' cannot be null. Check the App Service Configuration.");

    ManagedIdentityCredential userAssignedManagedCredentials = new(managedIdentityClientId);

    builder.Configuration.AddAzureAppConfiguration(options =>
        options.Connect(new Uri(appConfigurationEndpoint), userAssignedManagedCredentials)
            .ConfigureKeyVault(kv => kv.SetCredential(userAssignedManagedCredentials))
        .Select(KeyFilter.Any, version)); // <-- Important since we're using labels in our Azure App Configuration store
}
