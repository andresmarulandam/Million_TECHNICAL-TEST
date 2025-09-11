using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PropertyAPI.Domain.Entities;

public class Property
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("idOwner")]
  public required string IdOwner { get; set; }

  [BsonElement("name")]
  public required string Name { get; set; }

  [BsonElement("address")]
  public required string Address { get; set; }

  [BsonElement("price")]
  public decimal Price { get; set; }

  [BsonElement("imageUrl")]
  public string? ImageUrl { get; set; }

  [BsonElement("createdAt")]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
