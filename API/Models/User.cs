using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDBWebAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public bool isAdmin { get; set; }
    }
}