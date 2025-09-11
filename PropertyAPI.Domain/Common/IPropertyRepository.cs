using PropertyAPI.Domain.Entities;

namespace PropertyAPI.Domain.Common;

public interface IPropertyRepository : IRepository<Property>
{
  Task<IEnumerable<Property>> GetByFilterAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice);
}
