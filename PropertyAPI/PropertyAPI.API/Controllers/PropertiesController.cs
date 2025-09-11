using Microsoft.AspNetCore.Mvc;
using PropertyAPI.Application.DTOs;
using PropertyAPI.Application.Services;

namespace PropertyAPI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
  private readonly IPropertyService _propertyService;

  public PropertiesController(IPropertyService propertyService)
  {
    _propertyService = propertyService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<PropertyDto>>> GetAllProperties()
  {
    var properties = await _propertyService.GetAllPropertiesAsync();
    return Ok(properties);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<PropertyDto>> GetPropertyById(string id)
  {
    var property = await _propertyService.GetPropertyByIdAsync(id);
    if (property == null)
      return NotFound();

    return Ok(property);
  }

  [HttpPost]
  public async Task<ActionResult<PropertyDto>> CreateProperty([FromBody] CreatePropertyDto createPropertyDto)
  {
    try
    {
      var createdProperty = await _propertyService.CreatePropertyAsync(createPropertyDto);
      return CreatedAtAction(nameof(GetPropertyById), new { id = createdProperty.Id }, createdProperty);
    }
    catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateProperty(string id, [FromBody] CreatePropertyDto updatePropertyDto)
  {
    try
    {
      await _propertyService.UpdatePropertyAsync(id, updatePropertyDto);
      return NoContent();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
    catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteProperty(string id)
  {
    try
    {
      await _propertyService.DeletePropertyAsync(id);
      return NoContent();
    }
    catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }

  [HttpGet("filter")]
  public async Task<ActionResult<IEnumerable<PropertyDto>>> GetPropertiesByFilter(
      [FromQuery] string? name,
      [FromQuery] string? address,
      [FromQuery] decimal? minPrice,
      [FromQuery] decimal? maxPrice)
  {
    var filter = new PropertyFilterDto
    {
      Name = name,
      Address = address,
      MinPrice = minPrice,
      MaxPrice = maxPrice
    };

    var properties = await _propertyService.GetPropertiesByFilterAsync(filter);
    return Ok(properties);
  }
}
