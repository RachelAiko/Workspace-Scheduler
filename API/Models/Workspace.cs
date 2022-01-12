using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
	public class Workspace
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		public int SpaceNumber { get; set; }
		public int TypeID { get; set; }
		public int OfficeID { get; set; }
	}
}