using DAL.Models;
using E_commerce.AttributeOrFilter;
using E_commerce.Extension;
using E_commerce.Middleware;
using E_commerce.Tools;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Net.NetworkInformation;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Utils.Constant;
using Utils.Enums;
using Utils.Tools;
using MySql.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
var Logging = builder.Configuration.GetSection("Logging");
var LogDir = Logging["LogDir"];

Log.Logger = new LoggerConfiguration()
    .WriteTo.File(LogDir, rollingInterval: RollingInterval.Day)
    .CreateLogger();

// Register log event to DBL
DBL.Tools.LogHelper.OnLogEvent += LogHelper.LogMessage;

// Register AuthToken as a singleton
builder.Services.AddSingleton<AuthToken>();

// Add services to the container.
builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(CustomAuthorizeFilter)); // Add the custom authorization filter globally
});

builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// Add Swagger for API documentation
builder.Services.AddSwaggerGen(options =>
{
    var provider = builder.Services.BuildServiceProvider()
        .GetRequiredService<IApiVersionDescriptionProvider>();

    // Add a Swagger document for each API version
    foreach (var description in provider.ApiVersionDescriptions)
    {
        options.SwaggerDoc(description.GroupName, new OpenApiInfo
        {
            Title = $"Room Rental API {description.ApiVersion}",
            Version = description.ApiVersion.ToString(),
            Description = $"API Documentation for Version {description.ApiVersion}",
        });
    }

    // Add JWT support if required
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid JWT token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Load the key from appsettings.json
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = jwtSettings["Key"];
var issuer = jwtSettings["Issuer"];
var audience = jwtSettings["Audience"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
        ValidIssuer = issuer,
        ValidAudience = audience
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["authToken"];
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(ConstantCode.AuthorizePolicy.AdminAccessPolicy, policy =>
        policy.RequireAssertion(context =>
        {
            var userRole = context.User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole == Enum_UserRole.Admin.ToString())
            {
                return true; // Admins
            }

            return false;
        }));

    options.AddPolicy(ConstantCode.AuthorizePolicy.AdminOwnerAccessPolicy, policy =>
        policy.RequireAssertion(context =>
        {
            var userRole = context.User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole == Enum_UserRole.Admin.ToString() || userRole == Enum_UserRole.Owner.ToString())
            {
                return true; // Admins
            }

            return false;
        }));
});

var reactSettings = builder.Configuration.GetSection("ReactSettings");
var reactBaseUrl = reactSettings["BaseUrl"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder
            .WithOrigins(reactBaseUrl)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); // Allow credentials like cookies
});

// Add services to the container.
var sqlConnString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(sqlConnString));

// Auto Add All Services
builder.Services.AddAllService();

builder.Services.AddHttpContextAccessor();

builder.Services.AddApiVersioning(options =>
{
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1, 0); // Default to version 1.0
    options.ReportApiVersions = true; // Report supported versions in headers
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),   // Version in the URL (e.g., /api/v1/controller)
        new QueryStringApiVersionReader("api-version"), // Version in the query string
        new HeaderApiVersionReader("x-api-version")    // Version in a custom header
    );
});

// Add versioned API explorer (for Swagger)
builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV"; // Format: v1, v2
    options.SubstituteApiVersionInUrl = true; // Substitute version in route URLs
});

// Initialize EncryptionHelper with configuration
EncryptionHelper.Initialize(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
        foreach (var description in provider.ApiVersionDescriptions)
        {
            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json",
                description.GroupName.ToUpperInvariant());
        }
    });
}

app.UseHttpsRedirection();

// Apply CORS policy before authentication
app.UseCors("AllowLocalhost");

// Register custom JWT middleware before authentication and authorization
app.UseMiddleware<JwtMiddleware>();
app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthentication();

app.MapControllers();

// Auto insert seed data Database table
app.InitializerSeedDataDatabase();

app.UseSwagger();

app.UseAuthorization();

app.Run();