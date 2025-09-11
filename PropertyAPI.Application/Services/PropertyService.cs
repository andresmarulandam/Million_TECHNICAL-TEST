using PropertyAPI.Application.DTOs;
using PropertyAPI.Domain.Common;
using PropertyAPI.Domain.Entities;

namespace PropertyAPI.Application.Services;

public class PropertyService : IPropertyService
{
  private readonly IPropertyRepository _propertyRepository;

  public PropertyService(IPropertyRepository propertyRepository)
  {
    _propertyRepository = propertyRepository;
  }

  public async Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync()
  {
    var properties = await _propertyRepository.GetAllAsync();
    return properties.Select(MapToDto);
  }

  public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
  {
    var property = await _propertyRepository.GetByIdAsync(id);
    return property == null ? null : MapToDto(property);
  }

  public async Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto createPropertyDto)
  {
    var property = new Property
    {
      IdOwner = createPropertyDto.IdOwner,
      Name = createPropertyDto.Name,
      Address = createPropertyDto.Address,
      Price = createPropertyDto.Price,
      ImageUrl = createPropertyDto.ImageUrl,
      CreatedAt = DateTime.UtcNow
    };

    await _propertyRepository.CreateAsync(property);
    return MapToDto(property);
  }

  public async Task UpdatePropertyAsync(string id, CreatePropertyDto updatePropertyDto)
  {
    var existingProperty = await _propertyRepository.GetByIdAsync(id);
    if (existingProperty == null)
      throw new KeyNotFoundException("Property not found");

    existingProperty.Name = updatePropertyDto.Name;
    existingProperty.Address = updatePropertyDto.Address;
    existingProperty.Price = updatePropertyDto.Price;
    existingProperty.ImageUrl = updatePropertyDto.ImageUrl;

    await _propertyRepository.UpdateAsync(id, existingProperty);
  }

  public async Task DeletePropertyAsync(string id)
  {
    await _propertyRepository.DeleteAsync(id);
  }

  public async Task<IEnumerable<PropertyDto>> GetPropertiesByFilterAsync(PropertyFilterDto filter)
  {
    var properties = await _propertyRepository.GetByFilterAsync(
        filter.Name, filter.Address, filter.MinPrice, filter.MaxPrice);

    return properties.Select(MapToDto);
  }

  private static PropertyDto MapToDto(Property property)
  {
    return new PropertyDto
    {
      Id = property.Id,
      IdOwner = property.IdOwner,
      Name = property.Name,
      Address = property.Address,
      Price = property.Price,
      ImageUrl = property.ImageUrl
    };
  }
}
