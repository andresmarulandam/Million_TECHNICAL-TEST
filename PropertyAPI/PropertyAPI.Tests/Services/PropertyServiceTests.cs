using Moq;
using PropertyAPI.Application.Services;
using PropertyAPI.Domain.Common;
using PropertyAPI.Domain.Entities;
using PropertyAPI.Application.DTOs;

namespace PropertyAPI.Tests.Services;

[TestFixture]
public class PropertyServiceTests
{
  private Mock<IPropertyRepository> _mockRepository;
  private PropertyService _propertyService;

  [SetUp]
  public void Setup()
  {
    _mockRepository = new Mock<IPropertyRepository>();
    _propertyService = new PropertyService(_mockRepository.Object);
  }

  [Test]
  public async Task GetAllPropertiesAsync_ShouldReturnAllProperties()
  {
    // Arrange
    var properties = new List<Property>
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

    _mockRepository.Setup(repo => repo.GetAllAsync())
                  .ReturnsAsync(properties);

    // Act
    var result = await _propertyService.GetAllPropertiesAsync();

    // Assert
    Assert.That(result, Is.Not.Null);
    Assert.That(result.Count(), Is.EqualTo(2));
    Assert.That(result.First().Name, Is.EqualTo("Casa 1"));
  }

  [Test]
  public async Task GetPropertyByIdAsync_ExistingId_ShouldReturnProperty()
  {
    // Arrange
    var property = new Property
    {
      Id = "1",
      IdOwner = "owner1",
      Name = "Casa Test",
      Address = "Calle Test",
      Price = 150000
    };

    _mockRepository.Setup(repo => repo.GetByIdAsync("1"))
                  .ReturnsAsync(property);

    // Act
    var result = await _propertyService.GetPropertyByIdAsync("1");

    // Assert
    Assert.That(result, Is.Not.Null);
    Assert.That(result.Name, Is.EqualTo("Casa Test"));
  }

  [Test]
  public async Task GetPropertyByIdAsync_NonExistingId_ShouldReturnNull()
  {
    // Arrange
    _mockRepository.Setup(repo => repo.GetByIdAsync("999"))
                  .ReturnsAsync((Property?)null);

    // Act
    var result = await _propertyService.GetPropertyByIdAsync("999");

    // Assert
    Assert.That(result, Is.Null);
  }

  [Test]
  public async Task CreatePropertyAsync_ValidData_ShouldReturnCreatedProperty()
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

    _mockRepository.Setup(repo => repo.CreateAsync(It.IsAny<Property>()))
                  .Returns(Task.CompletedTask);

    // Act
    var result = await _propertyService.CreatePropertyAsync(createDto);

    // Assert
    Assert.That(result, Is.Not.Null);
    Assert.That(result.Name, Is.EqualTo("Nueva Casa"));
    Assert.That(result.Price, Is.EqualTo(300000));
    _mockRepository.Verify(repo => repo.CreateAsync(It.IsAny<Property>()), Times.Once);
  }

  [Test]
  public async Task GetPropertiesByFilterAsync_WithFilters_ShouldReturnFilteredProperties()
  {
    // Arrange
    var properties = new List<Property>
        {
            new() {
                Id = "1",
                IdOwner = "owner1",
                Name = "Casa Playa",
                Address = "Av. Costera",
                Price = 350000
            }
        };

    _mockRepository.Setup(repo => repo.GetByFilterAsync("Playa", null, null, null))
                  .ReturnsAsync(properties);

    var filter = new PropertyFilterDto { Name = "Playa" };

    // Act
    var result = await _propertyService.GetPropertiesByFilterAsync(filter);

    // Assert
    Assert.That(result, Is.Not.Null);
    Assert.That(result.Count(), Is.EqualTo(1));
    Assert.That(result.First().Name, Is.EqualTo("Casa Playa"));
  }
}
