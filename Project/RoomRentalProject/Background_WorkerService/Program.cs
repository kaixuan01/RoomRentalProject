using Background_WorkerService.Extension;
using Background_WorkerService.Worker;
using DAL.Models;
using Utils.Tools;

var builder = Host.CreateApplicationBuilder(args);

// Add services to the container.
var sqlConnString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddSqlServer<AppDbContext>(sqlConnString);

// Register AuthToken as a singleton
builder.Services.AddSingleton<AuthToken>();
builder.Services.AddHostedService<SendEmailWorker>();

// Initialize EncryptionHelper with configuration
EncryptionHelper.Initialize(builder.Configuration);

// Auto Add All Services
builder.Services.AddAllService();
builder.Services.AddHttpContextAccessor();


var host = builder.Build();

host.Run();
