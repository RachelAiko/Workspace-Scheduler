using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
	public class Reservation
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		// public DateTime Date { get; set; }
		public string Date { get; set; }
		public User Creator { get; set; }
		public User ReservedFor { get; set; }
		public Workspace Workspace { get; set; }
	}
}