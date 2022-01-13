using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class OfficeService
	{
		private readonly IMongoCollection<Office> _offices;
		public OfficeService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_offices = database.GetCollection<Office>(settings.OfficeCollectionName);
		}

		// GET all offices
		public List<Office> Get()
		{
			List<Office> offices;
			offices = _offices.Find(ofc => true).ToList();
			return offices;
		}
	}
}