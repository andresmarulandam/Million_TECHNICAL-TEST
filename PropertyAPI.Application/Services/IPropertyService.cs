using PropertyAPI.Application.DTOs;
using PropertyAPI.Domain.Entities;

namespace PropertyAPI.Application.Services;

public interface IPropertyService
{
  Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync();
  Task<PropertyDto?> GetPropertyByIdAsync(string id);
  Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto createPropertyDto);
  Task UpdatePropertyAsync(string id, CreatePropertyDto updatePropertyDto);
  Task DeletePropertyAsync(string id);
  Task<IEnumerable<PropertyDto>> GetPropertiesByFilterAsync(PropertyFilterDto filter);
}
