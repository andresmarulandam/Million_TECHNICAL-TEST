using MongoDB.Driver;
using PropertyAPI.Domain.Common;
using PropertyAPI.Domain.Entities;
using PropertyAPI.Infrastructure.Data;

namespace PropertyAPI.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
  private readonly IMongoCollection<Property> _properties;

  public PropertyRepository(MongoDBContext context)
  {
    _properties = context.Properties;
  }

  public async Task<IEnumerable<Property>> GetAllAsync()
  {
    return await _properties.Find(_ => true).ToListAsync();
  }

  public async Task<Property?> GetByIdAsync(string id)
  {
    return await _properties.Find(p => p.Id == id).FirstOrDefaultAsync();
  }

  public async Task CreateAsync(Property property)
  {
    await _properties.InsertOneAsync(property);
  }

  public async Task UpdateAsync(string id, Property property)
  {
    await _properties.ReplaceOneAsync(p => p.Id == id, property);
  }

  public async Task DeleteAsync(string id)
  {
    await _properties.DeleteOneAsync(p => p.Id == id);
  }

  public async Task<IEnumerable<Property>> GetByFilterAsync(
      string? name, string? address, decimal? minPrice, decimal? maxPrice)
  {
    var filter = Builders<Property>.Filter.Empty;

    if (!string.IsNullOrEmpty(name))
      filter &= Builders<Property>.Filter.Regex(p => p.Name,
          new MongoDB.Bson.BsonRegularExpression(name, "i"));

    if (!string.IsNullOrEmpty(address))
      filter &= Builders<Property>.Filter.Regex(p => p.Address,
          new MongoDB.Bson.BsonRegularExpression(address, "i"));

    if (minPrice.HasValue)
      filter &= Builders<Property>.Filter.Gte(p => p.Price, minPrice.Value);

    if (maxPrice.HasValue)
      filter &= Builders<Property>.Filter.Lte(p => p.Price, maxPrice.Value);

    return await _properties.Find(filter).ToListAsync();
  }
}
