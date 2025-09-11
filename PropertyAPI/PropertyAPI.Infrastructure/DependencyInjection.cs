using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PropertyAPI.Domain.Common;
using PropertyAPI.Infrastructure.Data;
using PropertyAPI.Infrastructure.Repositories;

namespace PropertyAPI.Infrastructure;

public static class DependencyInjection
{
  public static IServiceCollection AddInfrastructure(
      this IServiceCollection services, IConfiguration configuration)
  {
    // Configurar MongoDB Settings (FORMA CORRECTA)
    services.Configure<MongoDBSettings>(options =>
    {
      options.ConnectionString = configuration["MongoDBSettings:ConnectionString"];
      options.DatabaseName = configuration["MongoDBSettings:DatabaseName"];
      options.PropertiesCollectionName = configuration["MongoDBSettings:PropertiesCollectionName"];
    });

    // Registrar MongoDB Context
    services.AddSingleton<MongoDBContext>();

    // Registrar Repositorios
    services.AddScoped<IPropertyRepository, PropertyRepository>();

    return services;
  }
}
