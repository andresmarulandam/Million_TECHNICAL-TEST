using Microsoft.Extensions.DependencyInjection;
using PropertyAPI.Application.Services;

namespace PropertyAPI.Application;  // ← Este namespace es CORRECTO

public static class DependencyInjection
{
  public static IServiceCollection AddApplication(this IServiceCollection services)
  {
    services.AddScoped<IPropertyService, PropertyService>();
    return services;
  }
}
