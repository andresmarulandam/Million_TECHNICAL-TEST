using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PropertyAPI.Domain.Entities;

namespace PropertyAPI.Infrastructure.Data;

public class MongoDBContext
{
  private readonly IMongoDatabase _database;

  public MongoDBContext(IOptions<MongoDBSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    _database = client.GetDatabase(settings.Value.DatabaseName);
  }

  public IMongoCollection<Property> Properties =>
      _database.GetCollection<Property>("Properties");
}
