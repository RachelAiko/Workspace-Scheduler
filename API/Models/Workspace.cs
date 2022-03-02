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
		public Office Office { get; set; }
		public WorkspaceType WorkspaceType { get; set; }
		public bool IsPermanent { get; set; }
		public User PermanentFor { get; set; }

		public string[] Issues { get; set; }

	}
}