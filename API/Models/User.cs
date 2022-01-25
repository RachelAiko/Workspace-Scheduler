using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		public string Name { get; set; }
		public string AuthID { get; set; }
		public string Email { get; set; }
		public bool IsAdmin { get; set; }

		public User()
		{
			IsAdmin = false;
		}
	}
}