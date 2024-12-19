using DAL.Data;
using DAL.Models;
using DBL.User_Service.UserService;
using System.Reflection;

namespace E_commerce.Extension
{
    public static class StartUpExtension
    {
        public static void InitializerSeedDataDatabase(this IHost host)
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            var myContext = services.GetRequiredService<AppDbContext>();

            // Auto insert default data
            DBInitializerSeedData.InitializeDatabase(myContext);
        }

        public static void AddAllService(this IServiceCollection services)
        {
            // List of assemblies to scan
            var assembliesToScan = new List<Assembly>
            {
                typeof(Program).Assembly, // Main assembly
                typeof(AppDbContext).Assembly, // DAL assembly
                typeof(UserService).Assembly // DBL assembly
            };

            foreach (var assembly in assembliesToScan)
            {
                // Get Service and Repository
                var serviceTypes = assembly.GetTypes()
                    .Where(t => t.IsClass && !t.IsAbstract && (t.Name.EndsWith("Service") || t.Name.EndsWith("Repository")))
                    .ToList();

                foreach (var serviceType in serviceTypes)
                {
                    // Check if any interface
                    var interfaceType = serviceType.GetInterface($"I{serviceType.Name}");
                    if (interfaceType != null)
                    {
                        services.AddScoped(interfaceType, serviceType);
                    }
                    else
                    {
                        services.AddScoped(serviceType);
                    }
                }
            }
        }
    }
}
