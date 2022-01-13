using System;
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
		public string CreatorID { get; set; }
		public string ReservedForID { get; set; }
		public string ReservedForFirstName { get; set; }
		public string ReservedForLastName { get; set; }
		public int OfficeID { get; set; }
		public int SpaceNumber { get; set; }
	}
}