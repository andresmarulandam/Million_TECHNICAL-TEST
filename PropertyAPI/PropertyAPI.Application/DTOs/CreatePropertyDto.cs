using System.ComponentModel.DataAnnotations;

namespace PropertyAPI.Application.DTOs;

public class CreatePropertyDto
{
  [Required(ErrorMessage = "IdOwner is required")]
  public required string IdOwner { get; set; }

  [Required(ErrorMessage = "Name is required")]
  [StringLength(100, MinimumLength = 3)]
  public required string Name { get; set; }

  [Required(ErrorMessage = "Address is required")]
  public required string Address { get; set; }

  [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
  public decimal Price { get; set; }

  [Url(ErrorMessage = "ImageUrl must be a valid URL")]
  public string? ImageUrl { get; set; }
}
