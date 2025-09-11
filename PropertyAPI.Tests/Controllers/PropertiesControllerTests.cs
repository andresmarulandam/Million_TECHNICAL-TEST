using Microsoft.AspNetCore.Mvc;
using Moq;
using PropertyAPI.API.Controllers;
using PropertyAPI.Application.DTOs;
using PropertyAPI.Application.Services;

namespace PropertyAPI.Tests.Controllers;

[TestFixture]
public class PropertiesControllerTests
{
  private Mock<IPropertyService> _mockService;
  private PropertiesController _controller;

  [SetUp]
  public void Setup()
  {
    _mockService = new Mock<IPropertyService>();
    _controller = new PropertiesController(_mockService.Object);
  }

  [Test]
  public async Task GetAllProperties_ShouldReturnOkResult()
  {
    // Arrange
    var properties = new List<PropertyDto>
        {
            new() {
                Id = "1",
                IdOwner = "owner1",
                Name = "Casa 1",
                Address = "Calle 1",
                Price = 100000
            },
            new() {
                Id = "2",
                IdOwner = "owner2",
                Name = "Casa 2",
                Address = "Calle 2",
                Price = 200000
            }
        };

    _mockService.Setup(service => service.GetAllPropertiesAsync())
               .ReturnsAsync(properties);

    // Act
    var result = await _controller.GetAllProperties();

    // Assert
    Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    var okResult = result.Result as OkObjectResult;
    Assert.That(okResult.Value, Is.EqualTo(properties));
  }

  [Test]
  public async Task GetPropertyById_ExistingId_ShouldReturnOkResult()
  {
    // Arrange
    var property = new PropertyDto
    {
      Id = "1",
      IdOwner = "owner1",
      Name = "Casa Test",
      Address = "Calle Test",
      Price = 150000
    };

    _mockService.Setup(service => service.GetPropertyByIdAsync("1"))
               .ReturnsAsync(property);

    // Act
    var result = await _controller.GetPropertyById("1");

    // Assert
    Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
  }

  [Test]
  public async Task GetPropertyById_NonExistingId_ShouldReturnNotFound()
  {
    // Arrange
    _mockService.Setup(service => service.GetPropertyByIdAsync("999"))
               .ReturnsAsync((PropertyDto?)null);

    // Act
    var result = await _controller.GetPropertyById("999");

    // Assert
    Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
  }

  [Test]
  public async Task CreateProperty_ValidData_ShouldReturnCreated()
  {
    // Arrange
    var createDto = new CreatePropertyDto
    {
      IdOwner = "owner1",
      Name = "Nueva Casa",
      Address = "Calle 123",
      Price = 300000,
      ImageUrl = "http://test.com/image.jpg"
    };

    var createdProperty = new PropertyDto
    {
      Id = "123",
      IdOwner = "owner1",
      Name = "Nueva Casa",
      Address = "Calle 123",
      Price = 300000,
      ImageUrl = "http://test.com/image.jpg"
    };

    _mockService.Setup(service => service.CreatePropertyAsync(createDto))
               .ReturnsAsync(createdProperty);

    // Act
    var result = await _controller.CreateProperty(createDto);

    // Assert
    Assert.That(result.Result, Is.InstanceOf<CreatedAtActionResult>());
  }
}
