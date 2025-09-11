namespace PropertyAPI.Infrastructure.Data;

public class MongoDBSettings
{
  public required string ConnectionString { get; set; }
  public required string DatabaseName { get; set; }
  public required string PropertiesCollectionName { get; set; }
}
