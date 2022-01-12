using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
	public class WorkspaceType
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		public int TypeID { get; set; }
		public string Name { get; set; }
	}
}