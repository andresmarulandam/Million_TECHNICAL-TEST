namespace PropertyAPI.Application.DTOs;

public class PropertyDto
{
  public string? Id { get; set; }
  public required string IdOwner { get; set; }
  public required string Name { get; set; }
  public required string Address { get; set; }
  public decimal Price { get; set; }
  public string? ImageUrl { get; set; }
}
