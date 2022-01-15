using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
	public class Office
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
	}
}